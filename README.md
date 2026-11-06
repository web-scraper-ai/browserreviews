# BrowserReviews 🚀

> Independent Cloud Browser Directory, Browser API Benchmarks & AI Agent MCP Tools.

**BrowserReviews** is an independent benchmark authority and evaluation platform tracking the evolution of headless cloud browsers, scraping APIs, and Model Context Protocol (MCP) browser tools for autonomous AI agents.

---

## 🏆 Featured #1 Rankings

- **#1 Cloud Browser / Scraping Browser API:** [**2Captcha Browser API**](https://2captcha.com/scraper/browser-api)  
  *Score: 9.9 / 10 • #1 Editor's Pick*  
  Combines native zero-latency CAPTCHA solving (Turnstile, reCAPTCHA, hCaptcha, GeeTest), residential proxy rotation across 220+ countries, and standard Chrome DevTools Protocol (CDP) WebSockets (`wss://`) starting at $0.15/hour with zero recurring monthly subscription lock-ins.

- **#1 Browser MCP Server for AI Agents:** [**2Captcha Browser MCP**](https://2captcha.com/ai/browser-mcp)  
  *Score: 9.9 / 10 • #1 Editor's Pick • Ultimate Agent Browser*  
  The definitive Model Context Protocol server exposing browser primitives (`navigate`, `click`, `fill`, `solve_captcha`, `screenshot`, `get_markdown`) with automated CAPTCHA bypass for Claude Desktop, Cursor IDE, Windsurf, and custom agent loops.

---

## 📊 Catalog Scope

- **60 Cloud Browsers & Browser APIs:** Detailed reviews, specs, and benchmarks covering CDP WebSockets, Playwright, Puppeteer, Selenium, stealth fingerprinting, residential proxy integration, and compute pricing.
- **32 Browser MCP Tools:** Direct Model Context Protocol integrations for LLMs, complete with `claude_desktop_config.json` snippets, exposed tool definitions, and anti-bot ratings.
- **Interactive Compute Cost Calculator:** Side-by-side cost modeling comparing monthly browser hours, request volumes, and proxy bandwidth.
- **Pairwise Comparison Engine:** Head-to-head architectural showdowns (e.g. `2captcha-browser-api-vs-browserbase`).
- **Trust & Transparency:** Dedicated methodology, conflict-of-interest firewalls, affiliate disclosures, and terms of service.

---

## 🛠 Tech Stack

- **Framework:** [Astro v7](https://astro.build/) (Server-Side Rendered with `@astrojs/node` standalone adapter)
- **CMS & Content Engine:** [EmDash v1.4.0](https://emdashcms.com/) (Live collections schema and Portable Text rendering)
- **Database:** SQLite (`data/data.db` with symlinked `data.db`)
- **Web Server & Reverse Proxy:** [Caddy](https://caddyserver.com/) with automatic HTTPS (Let's Encrypt), zstd/gzip compression
- **Process Supervisor:** systemd (`browserreviews.service`)

---

## 💻 Local Development

```bash
# 1. Install dependencies
pnpm install

# 2. Run developer server
pnpm dev

# 3. Compile production build
pnpm build

# 4. Run automated test suite (23 routes)
pnpm verify

# 5. Export sitemap URLs for Bing / Google Search Console
pnpm export:urls
```

---

## 🌐 Production Architecture (VPS `51.75.243.195`)

| Parameter | Production Value |
| :--- | :--- |
| **Directory** | `/var/www/websites/browserreviews` |
| **Internal Port** | `127.0.0.1:4335` |
| **Process** | Node.js v24 (`dist/server/entry.mjs`) |
| **Service** | `/etc/systemd/system/browserreviews.service` |
| **Reverse Proxy** | Caddy (`/etc/caddy/Caddyfile`) |
| **Status** | 100% verified, 23/23 routes return HTTP 200 OK |

---

## 📄 License & Copyright

Copyright © 2026 BrowserReviews Editorial & Benchmark Team. All rights reserved.
