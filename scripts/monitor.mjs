#!/usr/bin/env node
/**
 * BrowserReviews Production Health & System Monitoring Script
 * Monitors: Local Astro SSR health (port 4335), systemd service/process,
 * disk space, SQLite integrity, backup freshness, and public TLS (if configured).
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import tls from 'node:tls';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const DB_PATH = process.env.DB_PATH || path.join(PROJECT_ROOT, 'data.db');
const BACKUP_DIR = process.env.BACKUP_DIR || path.join(PROJECT_ROOT, 'backups');
const LOGS_DIR = path.join(PROJECT_ROOT, 'logs');
const SITE_DOMAIN = process.env.SITE_DOMAIN || '';
const LOCAL_URL = process.env.LOCAL_URL || 'http://127.0.0.1:4335/';
const PUBLIC_URL = SITE_DOMAIN ? `https://${SITE_DOMAIN}/` : null;

fs.mkdirSync(LOGS_DIR, { recursive: true });
const LOG_FILE = path.join(LOGS_DIR, 'monitor.log');

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + '\n');
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
    return { ok: res.status === 200, status: res.status };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function checkTlsExpiry(hostname) {
  return new Promise((resolve) => {
    try {
      const socket = tls.connect(443, hostname, { servername: hostname, timeout: 5000 }, () => {
        const cert = socket.getPeerCertificate();
        socket.destroy();
        if (!cert || !cert.valid_to) {
          resolve({ ok: false, error: 'Could not retrieve certificate' });
        } else {
          const validTo = new Date(cert.valid_to);
          const daysLeft = Math.round((validTo - Date.now()) / (1000 * 60 * 60 * 24));
          resolve({ ok: daysLeft > 14, daysLeft, validTo: cert.valid_to });
        }
      });
      socket.on('error', (err) => resolve({ ok: false, error: err.message }));
      socket.on('timeout', () => { socket.destroy(); resolve({ ok: false, error: 'TLS connection timeout' }); });
    } catch (err) {
      resolve({ ok: false, error: err.message });
    }
  });
}

function checkService() {
  try {
    const out = execSync('systemctl is-active browserreviews.service 2>/dev/null', { encoding: 'utf8' }).trim();
    if (out === 'active') return { ok: true, status: out };
  } catch {}

  // Fallback: Check if port 4335 is bound by node
  try {
    const portCheck = execSync('lsof -i :4335 -sTCP:LISTEN -t 2>/dev/null', { encoding: 'utf8' }).trim();
    if (portCheck) {
      return { ok: true, status: `listening (PID ${portCheck.split('\n')[0]})` };
    }
  } catch {}

  return { ok: false, status: 'inactive/unbound' };
}

function checkDisk() {
  try {
    const out = execSync("df -k / | awk 'NR==2 {print $5}' | tr -d '%'", { encoding: 'utf8' }).trim();
    const pct = parseInt(out, 10);
    return { ok: pct < 85, usedPercent: pct };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function checkSqlite() {
  try {
    if (!fs.existsSync(DB_PATH)) return { ok: false, error: 'DB not found' };
    const db = new DatabaseSync(DB_PATH, { readOnly: true });
    try {
      const res = db.prepare('PRAGMA integrity_check').all();
      return { ok: res.length === 1 && res[0]?.integrity_check === 'ok', detail: res[0]?.integrity_check };
    } finally {
      db.close();
    }
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function checkBackupFreshness() {
  try {
    if (!fs.existsSync(BACKUP_DIR)) return { ok: false, error: 'Backups dir not found' };
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('data.db.backup-') && f.endsWith('.sqlite'))
      .sort()
      .reverse();

    if (files.length === 0) return { ok: false, error: 'No backup files found' };

    const latest = files[0];
    const stat = fs.statSync(path.join(BACKUP_DIR, latest));
    const ageHours = (Date.now() - stat.mtimeMs) / (1000 * 60 * 60);
    return { ok: ageHours < 36, ageHours: ageHours.toFixed(1), latestFile: latest };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function run() {
  log('Starting production health check for BrowserReviews...');
  const results = {};
  let allHealthy = true;

  // 1. Local Astro SSR Health
  results.localHttp = await checkUrl(LOCAL_URL);
  log(`Local Astro HTTP (port 4335): ${results.localHttp.ok ? 'PASS (200 OK)' : 'FAIL (' + (results.localHttp.error || results.localHttp.status) + ')'}`);
  if (!results.localHttp.ok) allHealthy = false;

  // 2. Public HTTPS (if domain configured)
  if (PUBLIC_URL) {
    results.publicHttp = await checkUrl(PUBLIC_URL);
    log(`Public HTTPS (${SITE_DOMAIN}): ${results.publicHttp.ok ? 'PASS (200 OK)' : 'FAIL (' + (results.publicHttp.error || results.publicHttp.status) + ')'}`);
    if (!results.publicHttp.ok) allHealthy = false;

    // TLS Certificate
    results.tls = await checkTlsExpiry(SITE_DOMAIN);
    log(`TLS Certificate: ${results.tls.ok ? 'PASS (' + results.tls.daysLeft + ' days left)' : 'WARN (' + (results.tls.error || results.tls.daysLeft + ' days') + ')'}`);
    if (!results.tls.ok) allHealthy = false;
  }

  // 3. Service / Process
  results.service = checkService();
  log(`Process/Service (port 4335): ${results.service.ok ? 'PASS (' + results.service.status + ')' : 'WARN (' + results.service.status + ')'}`);

  // 4. SQLite Integrity
  results.sqlite = checkSqlite();
  log(`SQLite Integrity: ${results.sqlite.ok ? 'PASS' : 'FAIL (' + (results.sqlite.error || results.sqlite.detail) + ')'}`);
  if (!results.sqlite.ok) allHealthy = false;

  // 5. Disk Space
  results.disk = checkDisk();
  log(`Root Disk Space: ${results.disk.ok ? 'PASS (' + results.disk.usedPercent + '% used)' : 'WARN (' + results.disk.usedPercent + '% used)'}`);

  // 6. Backup Freshness
  results.backup = checkBackupFreshness();
  log(`Backup Freshness: ${results.backup.ok ? 'PASS (' + results.backup.ageHours + 'h old, ' + results.backup.latestFile + ')' : 'INFO (' + (results.backup.error || results.backup.ageHours + 'h old') + ')'}`);

  if (allHealthy) {
    log('SUMMARY: ALL PRODUCTION CHECKS HEALTHY.');
    process.exit(0);
  } else {
    log('SUMMARY: ONE OR MORE CHECKS REPORTED ISSUES.');
    process.exit(1);
  }
}

run();
