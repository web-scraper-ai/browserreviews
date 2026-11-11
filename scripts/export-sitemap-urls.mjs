// Exports all sitemap URLs into chunked submission files for Bing Webmaster API and Google Search Console
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CLOUD_BROWSERS } from './data-browsers.mjs';
import { BROWSER_MCP_TOOLS } from './data-mcp.mjs';
import { LANDING_CLUSTERS } from './data-landing-clusters.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = process.env.SITE_URL || 'https://browserreviews.com';

const staticRoutes = [
  '/',
  '/browsers',
  '/mcp',
  '/rankings',
  '/connect-generator',
  '/calculator',
  '/compare',
  '/alternatives',
  '/best-for',
  '/about',
  '/methodology',
  '/editorial-policy',
  '/affiliate-disclosure',
  '/terms'
];

const browserRoutes = CLOUD_BROWSERS.map(b => `/reviews/${b.slug}`);
const mcpRoutes = BROWSER_MCP_TOOLS.map(m => `/mcp/${m.slug}`);
const comparisonRoutes = [
  '/compare/2captcha-browser-api-vs-browserbase',
  '/compare/2captcha-browser-api-vs-brightdata-scraping-browser',
  '/compare/2captcha-browser-api-vs-steel-dev',
  '/compare/2captcha-browser-api-vs-browserless',
  '/compare/2captcha-browser-api-vs-anchorbrowser',
  '/compare/2captcha-browser-api-vs-hyperbrowser',
  '/compare/2captcha-browser-api-vs-kernel-sh',
  '/compare/2captcha-browser-api-vs-browser-use',
  '/compare/2captcha-browser-api-vs-lightpanda',
  '/compare/2captcha-browser-mcp-vs-browserbase-mcp',
  '/compare/2captcha-browser-mcp-vs-browser-use-mcp',
  '/compare/2captcha-browser-mcp-vs-steel-mcp',
  '/compare/2captcha-browser-mcp-vs-kernel-mcp-server',
  '/compare/2captcha-browser-mcp-vs-hyperbrowser-mcp'
];

const alternativeSlugs = [
  'browserbase',
  'brightdata-scraping-browser',
  'browserless',
  'zenrows-browser',
  'steel-dev',
  'hyperbrowser',
  'oxylabs-agent-browser',
  'browser-use',
  'scrapfly-cloud-browser',
  'scrapeless'
];
const alternativeRoutes = alternativeSlugs.map(s => `/alternatives/${s}`);

const bestForSlugs = [
  'turnstile-bypass',
  'claude-desktop',
  'cursor',
  'pay-as-you-go',
  'residential-proxies',
  'datadome'
];
const bestForRoutes = bestForSlugs.map(s => `/best-for/${s}`);

const guideRoutes = [
  '/guides',
  '/guides/how-to-connect-cursor-to-browser-mcp',
  '/guides/how-to-connect-windsurf-cascade-to-browser-mcp',
  '/guides/how-to-build-autonomous-ai-agent-with-browser-mcp',
  '/guides/how-to-connect-puppeteer-cloud-browser',
  '/guides/how-to-connect-playwright-cloud-browser',
  '/guides/how-to-configure-claude-desktop-browser-mcp',
  '/guides/how-to-bypass-cloudflare-turnstile-cloud-browsers'
];

const topicRoutes = [
  '/what-is-a-headless-browser',
  '/topics',
  '/topics/headless-browser-api',
  '/topics/headless-chrome-docker-aws-lambda',
  '/topics/selenium-headless-chrome-python',
  '/topics/headless-browser-node-js',
  '/topics/phantomjs-alternatives',
  '/topics/browser-for-ai-agents'
];

const clusterRoutes = LANDING_CLUSTERS.map(c => `/${c.slug}`);

const allRoutes = [
  ...staticRoutes,
  ...clusterRoutes,
  ...browserRoutes,
  ...mcpRoutes,
  ...comparisonRoutes,
  ...alternativeRoutes,
  ...bestForRoutes,
  ...guideRoutes,
  ...topicRoutes
];
const allUrls = allRoutes.map(r => `${BASE_URL.replace(/\/$/, '')}${r}`);

const exportsDir = path.join(rootDir, 'exports');
const bingDir = path.join(exportsDir, 'bing_submission');

fs.mkdirSync(bingDir, { recursive: true });

// 1. Export all URLs
fs.writeFileSync(path.join(exportsDir, 'urls_all.txt'), allUrls.join('\n') + '\n');

// 2. Chunk in batches of 100 for Bing Webmaster API batch submit
const CHUNK_SIZE = 100;
let fileIdx = 1;
for (let i = 0; i < allUrls.length; i += CHUNK_SIZE) {
  const chunk = allUrls.slice(i, i + CHUNK_SIZE);
  const fileName = `bing_submit_${String(fileIdx).padStart(3, '0')}.txt`;
  fs.writeFileSync(path.join(bingDir, fileName), chunk.join('\n') + '\n');
  console.log(`Generated ${fileName} with ${chunk.length} URLs`);
  fileIdx++;
}

console.log(`\nTotal URLs exported: ${allUrls.length} across ${fileIdx - 1} submission batches.`);
