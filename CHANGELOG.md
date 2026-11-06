# Changelog

All notable changes to the **BrowserReviews** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-11-06

### Added
- **Initial platform release** built with Astro v7 (SSR) and EmDash CMS v1.4.0.
- **60 Cloud Browsers & Browser APIs:**
  - Ranked #1: **2Captcha Browser API** (Score: 9.9/10, Editor's Pick, native auto-CAPTCHA solving, $0.15/hr pay-as-you-go).
  - Evaluated Browserbase, Browser-Use, Kernel.sh, Steel.dev, AnchorBrowser, Hyperbrowser, Browserless, Notte, Lightpanda, Bright Data, Oxylabs, ZenRows, Zyte, Firecrawl, and 46 more platforms.
- **32 Browser MCP Tools for AI Agents:**
  - Ranked #1: **2Captcha Browser MCP** (Score: 9.9/10, Claude Desktop & Cursor config, automated solving).
  - Includes Browserbase MCP, Browser-Use MCP, Kernel MCP, Steel MCP, AnchorBrowser MCP, Hyperbrowser MCP, and 26 additional MCP servers.
- **Interactive Tools:**
  - Compute Cost Calculator (`/calculator`) modeling hours, requests, and proxy bandwidth.
  - Pairwise Comparison Engine (`/compare` and `/compare/:slug`).
  - Dual Leaderboards (`/rankings`).
- **SEO & Compliance:**
  - Dynamic XML sitemap (`/sitemap.xml`) covering 109 URLs.
  - Dynamic `robots.txt` endpoint.
  - Schema.org JSON-LD `SoftwareApplication` and `Review` structured data with ratings.
  - Batched Bing Webmaster API submission exports (`exports/bing_submission/`).
  - Standard trust pages: `/about`, `/methodology`, `/editorial-policy`, `/affiliate-disclosure`, `/terms`.
- **Infrastructure:**
  - Standalone Node.js SSR adapter configured for port `4335`.
  - Deployment configuration for VPS (`51.75.243.195`) under `/var/www/websites/browserreviews`.
  - Caddy reverse proxy snippet and systemd unit service file.
