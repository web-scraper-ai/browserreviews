#!/usr/bin/env node
/**
 * BrowserReviews Automated Production Backup & Restore Verification Script
 * Supports atomic SQLite VACUUM INTO, media directory archiving,
 * integrity verification, retention policy pruning, and isolated restore testing.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const DB_PATH = process.env.DB_PATH || path.join(PROJECT_ROOT, 'data.db');
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(PROJECT_ROOT, 'uploads');
const BACKUP_DIR = process.env.BACKUP_DIR || path.join(PROJECT_ROOT, 'backups');
const MAX_BACKUPS_TO_RETAIN = 14;

fs.mkdirSync(BACKUP_DIR, { recursive: true, mode: 0o700 });

async function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDbPath = path.join(BACKUP_DIR, `data.db.backup-${timestamp}.sqlite`);
  const backupUploadsPath = path.join(BACKUP_DIR, `uploads.backup-${timestamp}.tar.gz`);

  console.log(`[Backup] Starting backup process at ${new Date().toISOString()}`);
  console.log(`[Backup] Source database: ${DB_PATH}`);
  console.log(`[Backup] Destination: ${backupDbPath}`);

  if (!fs.existsSync(DB_PATH)) {
    throw new Error(`Source database does not exist at ${DB_PATH}`);
  }

  // 1. Transactional SQLite snapshot via VACUUM INTO
  const sourceDb = new DatabaseSync(DB_PATH);
  try {
    sourceDb.exec(`VACUUM INTO '${backupDbPath}'`);
    console.log(`[Backup] Database snapshot created successfully.`);
  } finally {
    sourceDb.close();
  }

  // 2. Set strict file permissions (0600 on POSIX)
  try {
    fs.chmodSync(backupDbPath, 0o600);
  } catch {}

  // 3. Verify backup integrity
  console.log(`[Backup] Verifying backup database integrity...`);
  const backupDb = new DatabaseSync(backupDbPath, { readOnly: true });
  try {
    const check = backupDb.prepare('PRAGMA integrity_check').all();
    if (check.length !== 1 || check[0]?.integrity_check !== 'ok') {
      throw new Error(`Integrity check failed: ${JSON.stringify(check)}`);
    }

    const tables = backupDb.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(t => t.name);
    console.log(`[Backup] Integrity check PASSED: ok (${tables.length} tables found)`);

    // Check key tables if present
    const verified = {};
    if (tables.includes('users')) {
      verified.users = backupDb.prepare('SELECT count(*) as c FROM users').get()?.c ?? 0;
    }
    if (tables.includes('ec_browsers')) {
      verified.browsers = backupDb.prepare('SELECT count(*) as c FROM ec_browsers').get()?.c ?? 0;
    }
    if (tables.includes('ec_pages')) {
      verified.pages = backupDb.prepare('SELECT count(*) as c FROM ec_pages').get()?.c ?? 0;
    }
    if (tables.includes('_emdash_migrations')) {
      verified.migrations = backupDb.prepare('SELECT count(*) as c FROM _emdash_migrations').get()?.c ?? 0;
    }

    console.log(`[Backup] Verified records:`, JSON.stringify(verified));
  } finally {
    backupDb.close();
  }

  // 4. Archive uploads directory if present
  if (fs.existsSync(UPLOADS_DIR)) {
    const files = fs.readdirSync(UPLOADS_DIR);
    if (files.length > 0) {
      console.log(`[Backup] Archiving ${files.length} uploaded files...`);
      try {
        execSync(`tar -czf "${backupUploadsPath}" -C "${path.dirname(UPLOADS_DIR)}" "${path.basename(UPLOADS_DIR)}"`, { stdio: 'pipe' });
        try { fs.chmodSync(backupUploadsPath, 0o600); } catch {}
        console.log(`[Backup] Uploads archive created: ${backupUploadsPath}`);
      } catch (err) {
        console.warn(`[Backup] Warning: Could not create uploads tarball: ${err.message}`);
      }
    } else {
      console.log(`[Backup] Uploads directory is empty. Skipping tarball.`);
    }
  }

  // 5. Retention policy: Prune backups exceeding retention limit
  const backupFiles = fs.readdirSync(BACKUP_DIR)
    .filter(f => f.startsWith('data.db.backup-') && f.endsWith('.sqlite'))
    .sort()
    .reverse();

  console.log(`[Backup] Total SQLite backups found: ${backupFiles.length}`);
  if (backupFiles.length > MAX_BACKUPS_TO_RETAIN) {
    const toRemove = backupFiles.slice(MAX_BACKUPS_TO_RETAIN);
    for (const oldFile of toRemove) {
      const fullPath = path.join(BACKUP_DIR, oldFile);
      fs.unlinkSync(fullPath);
      console.log(`[Backup] Pruned old backup: ${oldFile}`);

      // Also prune corresponding uploads archive if it exists
      const ts = oldFile.replace('data.db.backup-', '').replace('.sqlite', '');
      const oldUploads = path.join(BACKUP_DIR, `uploads.backup-${ts}.tar.gz`);
      if (fs.existsSync(oldUploads)) {
        fs.unlinkSync(oldUploads);
        console.log(`[Backup] Pruned old uploads archive: ${path.basename(oldUploads)}`);
      }
    }
  }

  console.log(`[Backup] Backup procedure completed successfully.`);
  return backupDbPath;
}

// Dry-run restore drill to verify the snapshot
async function drillRestore(backupPath) {
  console.log(`[Drill] Running restore drill verification on: ${backupPath}`);
  if (!fs.existsSync(backupPath)) {
    throw new Error(`Target backup does not exist: ${backupPath}`);
  }
  const db = new DatabaseSync(backupPath, { readOnly: true });
  try {
    const check = db.prepare('PRAGMA quick_check').all();
    if (check[0]?.quick_check !== 'ok') {
      throw new Error(`Drill failed: quick_check returned ${JSON.stringify(check)}`);
    }
    console.log(`[Drill] PRAGMA quick_check: ok`);
    console.log(`[Drill] Restore drill verification PASSED.`);
  } finally {
    db.close();
  }
}

async function run() {
  const args = process.argv.slice(2);
  const isDrillOnly = args.includes('--drill-only');

  try {
    if (isDrillOnly) {
      const latestBackup = fs.readdirSync(BACKUP_DIR)
        .filter(f => f.startsWith('data.db.backup-') && f.endsWith('.sqlite'))
        .sort()
        .reverse()[0];
      if (!latestBackup) {
        throw new Error(`No backups found in ${BACKUP_DIR} to drill test.`);
      }
      await drillRestore(path.join(BACKUP_DIR, latestBackup));
    } else {
      const backupPath = await createBackup();
      await drillRestore(backupPath);
    }
    process.exit(0);
  } catch (err) {
    console.error(`[Backup Error] CRITICAL: ${err.message}`);
    process.exit(1);
  }
}

run();
