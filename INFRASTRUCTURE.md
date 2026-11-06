# Shared VPS Infrastructure Documentation (Satellites)

This document provides shared operational documentation for all satellite websites hosted on the production Linux VPS. Any engineer or automation deploying to or managing services on this server must follow these guidelines.

---

## 1. Server Overview & Access

| Parameter | Value | Notes |
| :--- | :--- | :--- |
| **Server IPv4** | `51.75.243.195` | Production VPS |
| **Operating System** | Ubuntu 24.04 LTS | Standard system packages |
| **SSH User** | `dmitriy` | Main service operator |
| **SSH Port** | `22` / `2222` | Standard port `22` (or alternate port `2222`) |
| **SSH Command** | `ssh -p 22 dmitriy@51.75.243.195` | Specify active SSH port |
| **Websites Root Directory** | `/var/www/websites/` | Base directory for all site code and assets |
| **System Reverse Proxy** | Caddy (systemd service) | Owns public ports `80` (HTTP) and `443` (HTTPS) |
| **Firewall & Security** | UFW firewall active, Fail2ban active | Ports `22`, `80`, `443` open. No internal app ports should be exposed publicly. |

---

## 2. Satellite Websites Registry

All satellite websites live in dedicated subdirectories under `/var/www/websites/`.

| Website / Satellite | Domain | Directory on VPS | Architecture / Ingress |
| :--- | :--- | :--- | :--- |
| **2scraper** | `https://2scraper.com` | `/var/www/websites/2scraper.com` | Static files served directly by Caddy |
| **solvcaptcha** | `https://solvcaptcha.com` | `/var/www/websites/capreviews` (or `solvcaptcha`) | Astro SSR + Node 24 (`capreviews.service`), proxied to `127.0.0.1:4321` |
| **2-proxy (ProxyReviews)** | `https://2-proxy.com` | `/var/www/websites/2-proxy.com` | Astro SSR + Node 24 (`2-proxy.service`), proxied to `127.0.0.1:4328` |
| **BrowserReviews** | *(Domain pending)* | `/var/www/websites/browserreviews` | Astro SSR + Node 24 (`browserreviews.service`), proxied to `127.0.0.1:4335` |
| **Other Satellites** | *(e.g. capreviews, etc.)* | `/var/www/websites/<domain>` | Configured via Caddy site block |

---

## 3. Site-Specific Deployment Specifications

### A. 2scraper.com (Static Website)

- **URL**: `https://2scraper.com`
- **VPS Directory**: `/var/www/websites/2scraper.com/`
- **Nature**: Static website served directly from disk by system Caddy.
- **Deployment Command** (execute from parent directory containing `2scraper.com/`):
  ```bash
  rsync -av --delete --exclude '_build/' -e "ssh -p 22" \
    2scraper.com/ \
    dmitriy@51.75.243.195:/var/www/websites/2scraper.com/
  ```

> [!WARNING]
> - **Never upload `_build/`**: Keep build caches and intermediate build artifacts off the production filesystem.
> - **Caution with `--delete`**: `--delete` removes destination files not present in the source. Use it exclusively when intentionally synchronizing this specific static site.

---

### B. 2-proxy.com / ProxyReviews (Astro SSR + SQLite)

- **URL**: `https://2-proxy.com`
- **VPS Directory**: `/var/www/websites/2-proxy.com/`
- **Nature**: Dynamic SSR application powered by Node.js 24 and managed via systemd (`2-proxy.service`).
- **Internal Loopback Binding**: `127.0.0.1:4328` (never bound to `0.0.0.0`).
- **Persistent Data Paths**:
  - SQLite Database: `/var/www/websites/2-proxy.com/data/data.db`
  - Media Uploads: `/var/www/websites/2-proxy.com/uploads/`

#### Synchronization & Build Workflow:
1. **Checkpoint WAL on local development**:
   ```bash
   sqlite3 data.db "PRAGMA wal_checkpoint(TRUNCATE);"
   ```
2. **Sync database and media**:
   ```bash
   rsync -avz -e "ssh -p 22" data.db dmitriy@51.75.243.195:/var/www/websites/2-proxy.com/data/data.db
   rsync -avz -e "ssh -p 22" uploads/ dmitriy@51.75.243.195:/var/www/websites/2-proxy.com/uploads/
   ```
3. **Build with explicit environment variables** (EmDash bakes paths into `dist/` at compile time):
   ```bash
   cd /var/www/websites/2-proxy.com
   pnpm install --frozen-lockfile
   set -a && source .env && set +a && pnpm build
   sudo systemctl restart 2-proxy
   ```

---

### C. BrowserReviews (Astro SSR + SQLite)

- **URL**: *(Domain pending / port 4335)*
- **VPS Directory**: `/var/www/websites/browserreviews/`
- **Nature**: Dynamic SSR application powered by Node.js 24 and managed via systemd (`browserreviews.service`).
- **Internal Loopback Binding**: `127.0.0.1:4335` (never bound to `0.0.0.0`).
- **Persistent Data Paths**:
  - SQLite Database: `/var/www/websites/browserreviews/data/data.db`
  - Media Uploads: `/var/www/websites/browserreviews/uploads/`

#### Build & Deployment Workflow:
```bash
cd /var/www/websites/browserreviews
git pull
pnpm install --frozen-lockfile
set -a && source .env && set +a && pnpm build
# Service restart:
sudo systemctl restart browserreviews
```

---

## 4. System Caddy Configuration & Safety Rules

System Caddy manages automatic TLS certificate issuance and routing for all hosted satellite domains.

- **Config Path**: `/etc/caddy/Caddyfile`
- **Service Name**: `caddy.service`

> [!CAUTION]
> **CRITICAL RULE: NEVER OVERWRITE `/etc/caddy/Caddyfile`!**
> Never replace the host Caddyfile with a configuration file from an individual repository (such as `capreviews`, `proxyreviews`, or any other satellite). Overwriting it drops traffic and active TLS certificates for all other existing websites (`2scraper.com`, `solvcaptcha`, etc.).

### Safe Caddy Management Procedure

1. **Always back up the existing Caddyfile before making edits**:
   ```bash
   sudo cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak.$(date +%Y%m%d_%H%M%S)
   ```

2. **Add new websites by appending blocks or importing snippets**:
   Append the site block at the end of `/etc/caddy/Caddyfile`:
   ```bash
   sudo tee -a /etc/caddy/Caddyfile < Caddyfile.snippet
   ```
   *Or include site configs using an `import /etc/caddy/sites-available/*.caddy` directive.*

3. **Validate the configuration before reloading** (MANDATORY):
   ```bash
   sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
   ```

4. **Reload Caddy safely without downtime**:
   ```bash
   sudo systemctl reload caddy
   ```

   *One-line validation and reload pattern:*
   ```bash
   sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile && sudo systemctl reload caddy
   ```

5. **Rollback if validation fails**:
   ```bash
   sudo cp /etc/caddy/Caddyfile.bak.<TIMESTAMP> /etc/caddy/Caddyfile
   sudo systemctl reload caddy
   ```

---

## 5. Universal Rules for Satellite Deployments

1. **Isolation**: Every satellite website must live in its own directory `/var/www/websites/<domain>/`.
2. **Localhost Only for Backend / SSR Services**: Dynamic applications must bind strictly to `127.0.0.1:<PORT>`. Never bind to `0.0.0.0`.
3. **No Firewall Modifications**: Do not open application backend ports in UFW (`ufw allow ...`). Ingress is strictly mediated by system Caddy on ports `80` and `443`.
4. **Port Allocation Check**: Before configuring a new backend port, verify that it is not already in use:
   ```bash
   ss -tulpn | grep :<PORT>
   # Or view all active listening services:
   ss -tulpn | grep LISTEN
   ```
5. **Systemd Services**: Backend services must run as non-root user `dmitriy` under dedicated unit files in `/etc/systemd/system/<site>.service`.
6. **Node.js Path Verification**: Do not hardcode `/usr/bin/node` without checking. Confirm active Node binary with `which node`.
