// Seed generator for BrowserReviews
// Assembles complete seed.json containing collections schema and content for:
// - 60 Cloud Browsers
// - 32 Browser MCP Tools
// - Trust & Legal Pages

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CLOUD_BROWSERS } from './data-browsers.mjs';
import { BROWSER_MCP_TOOLS } from './data-mcp.mjs';
import { TRUST_PAGES } from './data-pages.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Helper to convert simple Markdown text into Portable Text blocks
function markdownToPortableText(md, prefix = 'blk') {
  if (!md) return [];
  const lines = md.split('\n');
  const blocks = [];
  let blockIdx = 0;

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    blockIdx++;
    const key = `${prefix}_${blockIdx}`;

    if (line.startsWith('# ')) {
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'h1',
        children: [{ _type: 'span', _key: `${key}_s`, text: line.replace(/^#\s+/, '') }]
      });
    } else if (line.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'h2',
        children: [{ _type: 'span', _key: `${key}_s`, text: line.replace(/^##\s+/, '') }]
      });
    } else if (line.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'h3',
        children: [{ _type: 'span', _key: `${key}_s`, text: line.replace(/^###\s+/, '') }]
      });
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'normal',
        listItem: 'bullet',
        level: 1,
        children: [{ _type: 'span', _key: `${key}_s`, text: line.replace(/^[-*]\s+/, '') }]
      });
    } else if (/^\d+\.\s+/.test(line)) {
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'normal',
        listItem: 'number',
        level: 1,
        children: [{ _type: 'span', _key: `${key}_s`, text: line.replace(/^\d+\.\s+/, '') }]
      });
    } else if (line.startsWith('---')) {
      // Horizontal rule represented as an empty styled block or spacer
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'normal',
        children: [{ _type: 'span', _key: `${key}_s`, text: '— — —' }]
      });
    } else {
      blocks.push({
        _type: 'block',
        _key: key,
        style: 'normal',
        children: [{ _type: 'span', _key: `${key}_s`, text: line }]
      });
    }
  }

  return blocks;
}

const SEED = {
  "$schema": "https://emdashcms.com/seed.schema.json",
  "version": "1",
  "meta": {
    "name": "BrowserReviews",
    "description": "Independent Cloud Browser Directory, Browser API Benchmarks & AI Agent MCP Tools",
    "author": "BrowserReviews Editorial & Benchmark Team"
  },
  "settings": {
    "title": "BrowserReviews",
    "tagline": "Independent Cloud Browser Directory, Browser API Benchmarks & AI Agent MCP Tools"
  },
  "menus": [
    {
      "name": "primary",
      "label": "Primary Navigation",
      "items": [
        { "label": "Cloud Browsers", "url": "/browsers" },
        { "label": "Browser MCP", "url": "/mcp" },
        { "label": "Rankings", "url": "/rankings" },
        { "label": "Cost Calculator", "url": "/calculator" },
        { "label": "Compare", "url": "/compare" },
        { "label": "About", "url": "/about" }
      ]
    },
    {
      "name": "footer",
      "label": "Footer Navigation",
      "items": [
        { "label": "About", "url": "/about" },
        { "label": "Methodology", "url": "/methodology" },
        { "label": "Editorial Policy", "url": "/editorial-policy" },
        { "label": "Affiliate Disclosure", "url": "/affiliate-disclosure" },
        { "label": "Terms of Service", "url": "/terms" }
      ]
    }
  ],
  "collections": [
    {
      "slug": "browsers",
      "label": "Cloud Browsers",
      "labelSingular": "Cloud Browser",
      "urlPattern": "/reviews/:slug",
      "supports": ["drafts", "revisions", "search", "seo"],
      "titleField": "name",
      "fields": [
        { "slug": "name", "label": "Browser Name", "type": "string", "required": true, "searchable": true },
        { "slug": "demo_rank", "label": "Rank", "type": "integer", "required": true },
        { "slug": "tagline", "label": "Tagline", "type": "string", "searchable": true },
        { "slug": "website_url", "label": "Website URL", "type": "url" },
        { "slug": "affiliate_url", "label": "Affiliate URL", "type": "url" },
        { "slug": "status_badge", "label": "Status Badge", "type": "string" },
        { "slug": "overall_score", "label": "Overall Score (0-10)", "type": "number" },
        { "slug": "starting_price_hour", "label": "Price Per Browser Hour ($)", "type": "number" },
        { "slug": "starting_price_request", "label": "Price Per 1k Requests ($)", "type": "number" },
        { "slug": "pricing_model", "label": "Pricing Model", "type": "string" },
        { "slug": "free_tier", "label": "Free Tier / Credits", "type": "string" },
        { "slug": "cdp_support", "label": "CDP Support", "type": "boolean" },
        { "slug": "playwright_support", "label": "Playwright Support", "type": "boolean" },
        { "slug": "puppeteer_support", "label": "Puppeteer Support", "type": "boolean" },
        { "slug": "selenium_support", "label": "Selenium Support", "type": "boolean" },
        { "slug": "stealth_fingerprinting", "label": "Stealth Fingerprinting", "type": "text" },
        { "slug": "antibot_bypass", "label": "Anti-Bot Bypass", "type": "text" },
        { "slug": "captcha_auto_solve", "label": "CAPTCHA Auto Solving", "type": "text" },
        { "slug": "proxy_integration", "label": "Proxy Integration", "type": "text" },
        { "slug": "mcp_support", "label": "MCP Server Support", "type": "boolean" },
        { "slug": "mcp_slug", "label": "MCP Slug", "type": "string" },
        { "slug": "max_concurrency", "label": "Max Concurrency", "type": "string" },
        {
          "slug": "pros",
          "label": "Pros",
          "type": "repeater",
          "fields": [{ "slug": "text", "label": "Pro", "type": "string" }]
        },
        {
          "slug": "cons",
          "label": "Cons",
          "type": "repeater",
          "fields": [{ "slug": "text", "label": "Con", "type": "string" }]
        },
        { "slug": "verdict", "label": "Editorial Verdict", "type": "text" },
        { "slug": "ideal_use_case", "label": "Ideal Use Case", "type": "text" },
        { "slug": "avoid_if", "label": "Avoid If", "type": "text" },
        { "slug": "summary", "label": "Short Summary", "type": "text" },
        { "slug": "year_founded", "label": "Year Founded", "type": "integer" },
        { "slug": "features", "label": "Features List", "type": "json" },
        { "slug": "operational_status", "label": "Status", "type": "string" },
        { "slug": "content", "label": "Detailed Review Content", "type": "portableText" }
      ]
    },
    {
      "slug": "mcp_tools",
      "label": "Browser MCP Tools",
      "labelSingular": "Browser MCP Tool",
      "urlPattern": "/mcp/:slug",
      "supports": ["drafts", "revisions", "search", "seo"],
      "titleField": "name",
      "fields": [
        { "slug": "name", "label": "Tool Name", "type": "string", "required": true, "searchable": true },
        { "slug": "demo_rank", "label": "Rank", "type": "integer", "required": true },
        { "slug": "tagline", "label": "Tagline", "type": "string", "searchable": true },
        { "slug": "website_url", "label": "Website URL", "type": "url" },
        { "slug": "affiliate_url", "label": "Affiliate URL", "type": "url" },
        { "slug": "github_url", "label": "GitHub URL", "type": "url" },
        { "slug": "status_badge", "label": "Status Badge", "type": "string" },
        { "slug": "overall_score", "label": "Overall Score (0-10)", "type": "number" },
        { "slug": "provider_slug", "label": "Cloud Browser Provider Slug", "type": "string" },
        { "slug": "install_command", "label": "Install Command", "type": "string" },
        { "slug": "config_snippet", "label": "Claude Desktop Config Snippet", "type": "text" },
        { "slug": "tools_provided", "label": "Tools Provided", "type": "json" },
        { "slug": "supports_claude_desktop", "label": "Claude Desktop", "type": "boolean" },
        { "slug": "supports_cursor", "label": "Cursor IDE", "type": "boolean" },
        { "slug": "supports_custom_agents", "label": "Custom Agent SDKs", "type": "boolean" },
        { "slug": "captcha_solving", "label": "CAPTCHA Handling", "type": "text" },
        { "slug": "stealth_bypass", "label": "Stealth & Evasion", "type": "text" },
        { "slug": "pricing_tier", "label": "Pricing & Licensing", "type": "string" },
        {
          "slug": "pros",
          "label": "Pros",
          "type": "repeater",
          "fields": [{ "slug": "text", "label": "Pro", "type": "string" }]
        },
        {
          "slug": "cons",
          "label": "Cons",
          "type": "repeater",
          "fields": [{ "slug": "text", "label": "Con", "type": "string" }]
        },
        { "slug": "verdict", "label": "Editorial Verdict", "type": "text" },
        { "slug": "ideal_use_case", "label": "Ideal Use Case", "type": "text" },
        { "slug": "avoid_if", "label": "Avoid If", "type": "text" },
        { "slug": "summary", "label": "Short Summary", "type": "text" },
        { "slug": "features", "label": "Key Features", "type": "json" },
        { "slug": "content", "label": "Documentation & Setup Guide", "type": "portableText" }
      ]
    },
    {
      "slug": "pages",
      "label": "Pages",
      "labelSingular": "Page",
      "urlPattern": "/:slug",
      "supports": ["drafts", "revisions", "search", "seo"],
      "titleField": "title",
      "fields": [
        { "slug": "title", "label": "Page Title", "type": "string", "required": true, "searchable": true },
        { "slug": "subtitle", "label": "Subtitle", "type": "string" },
        { "slug": "summary", "label": "Summary", "type": "text" },
        { "slug": "content", "label": "Body Content", "type": "portableText" }
      ]
    }
  ],
  "content": {
    "browsers": CLOUD_BROWSERS.map(b => ({
      id: b.slug,
      slug: b.slug,
      status: "published",
      data: {
        title: b.name,
        name: b.name,
        demo_rank: b.demo_rank,
        tagline: b.tagline,
        website_url: b.website_url,
        affiliate_url: b.affiliate_url,
        status_badge: b.status_badge,
        overall_score: b.overall_score,
        starting_price_hour: b.starting_price_hour,
        starting_price_request: b.starting_price_request,
        pricing_model: b.pricing_model,
        free_tier: b.free_tier,
        cdp_support: b.cdp_support,
        playwright_support: b.playwright_support,
        puppeteer_support: b.puppeteer_support,
        selenium_support: b.selenium_support,
        stealth_fingerprinting: b.stealth_fingerprinting,
        antibot_bypass: b.antibot_bypass,
        captcha_auto_solve: b.captcha_auto_solve,
        proxy_integration: b.proxy_integration,
        mcp_support: b.mcp_support,
        mcp_slug: b.mcp_slug,
        max_concurrency: b.max_concurrency,
        pros: b.pros,
        cons: b.cons,
        verdict: b.verdict,
        ideal_use_case: b.ideal_use_case,
        avoid_if: b.avoid_if,
        summary: b.summary,
        year_founded: b.year_founded || 2024,
        features: b.features,
        operational_status: b.operational_status,
        content: markdownToPortableText(`
## Comprehensive Evaluation: ${b.name}

${b.summary}

### Key Technical Architecture
${b.name} offers cloud-hosted browser automation connecting via standard Chrome DevTools Protocol (CDP) WebSockets. This architecture allows developers using Playwright, Puppeteer, or custom AI agent loops to offload high-memory Chromium processes to scalable cloud clusters.

- **Anti-Bot & Stealth Defense:** ${b.antibot_bypass}.
- **Fingerprinting & Emulation:** ${b.stealth_fingerprinting}.
- **CAPTCHA Resolution:** ${b.captcha_auto_solve}.
- **Proxy Routing:** ${b.proxy_integration}.

### Pricing & Unit Economics
Starting at $${b.starting_price_hour.toFixed(2)}/hour and $${b.starting_price_request.toFixed(2)} per 1,000 requests, ${b.name} operates under a **${b.pricing_model.replace(/_/g, ' ')}** billing model. ${b.free_tier}.

### Our Verdict
${b.verdict}
`, `b_${b.slug}`)
      }
    })),
    "mcp_tools": BROWSER_MCP_TOOLS.map(m => ({
      id: m.slug,
      slug: m.slug,
      status: "published",
      data: {
        title: m.name,
        name: m.name,
        demo_rank: m.demo_rank,
        tagline: m.tagline,
        website_url: m.website_url,
        affiliate_url: m.affiliate_url,
        github_url: m.github_url,
        status_badge: m.status_badge,
        overall_score: m.overall_score,
        provider_slug: m.provider_slug,
        install_command: m.install_command,
        config_snippet: m.config_snippet,
        tools_provided: m.tools_provided,
        supports_claude_desktop: m.supports_claude_desktop,
        supports_cursor: m.supports_cursor,
        supports_custom_agents: m.supports_custom_agents,
        captcha_solving: m.captcha_solving,
        stealth_bypass: m.stealth_bypass,
        pricing_tier: m.pricing_tier,
        pros: m.pros,
        cons: m.cons,
        verdict: m.verdict,
        ideal_use_case: m.ideal_use_case,
        avoid_if: m.avoid_if,
        summary: m.summary,
        features: m.features,
        content: markdownToPortableText(`
## Model Context Protocol (MCP) Integration: ${m.name}

${m.summary}

### Setup & Installation
Run the following command or add to your \`claude_desktop_config.json\`:

\`\`\`bash
${m.install_command}
\`\`\`

### Tools Exposed to AI Agents
The server exposes the following high-level tools to Claude, Cursor, and custom agent loops:
${(m.tools_provided || []).map(t => `- \`${t}\``).join('\n')}

### Anti-Bot & CAPTCHA Capabilities
- **CAPTCHA Solving:** ${m.captcha_solving}
- **Stealth & Evasion:** ${m.stealth_bypass}

### Editorial Verdict
${m.verdict}
`, `m_${m.slug}`)
      }
    })),
    "pages": TRUST_PAGES.map(p => ({
      id: p.slug,
      slug: p.slug,
      status: "published",
      data: {
        title: p.title,
        subtitle: p.subtitle,
        summary: p.summary,
        content: markdownToPortableText(p.content, `p_${p.slug}`)
      }
    }))
  }
};

fs.writeFileSync(path.join(rootDir, 'seed/seed.json'), JSON.stringify(SEED, null, 2));
console.log(`Successfully generated seed/seed.json with:`);
console.log(`- ${SEED.content.browsers.length} Cloud Browsers`);
console.log(`- ${SEED.content.mcp_tools.length} Browser MCP Tools`);
console.log(`- ${SEED.content.pages.length} Trust & Legal Pages`);
