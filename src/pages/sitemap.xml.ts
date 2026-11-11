import type { APIRoute } from "astro";
import { fetchAllBrowsers, fetchAllMcpTools } from "../utils/browser-data";
import { getSiteOrigin } from "../utils/site-url";

export const GET: APIRoute = async ({ request }) => {
  const origin = getSiteOrigin(request);
  const { browsers } = await fetchAllBrowsers();
  const { tools: mcpTools } = await fetchAllMcpTools();

  const staticPages = [
    { loc: "/", changefreq: "daily", priority: 1.0 },
    { loc: "/browsers", changefreq: "daily", priority: 0.9 },
    { loc: "/mcp", changefreq: "daily", priority: 0.9 },
    { loc: "/rankings", changefreq: "daily", priority: 0.8 },
    { loc: "/connect-generator", changefreq: "weekly", priority: 0.85 },
    { loc: "/calculator", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare", changefreq: "weekly", priority: 0.8 },
    { loc: "/alternatives", changefreq: "daily", priority: 0.85 },
    { loc: "/best-for", changefreq: "daily", priority: 0.85 },
    { loc: "/about", changefreq: "monthly", priority: 0.6 },
    { loc: "/methodology", changefreq: "monthly", priority: 0.6 },
    { loc: "/editorial-policy", changefreq: "monthly", priority: 0.5 },
    { loc: "/affiliate-disclosure", changefreq: "monthly", priority: 0.5 },
    { loc: "/terms", changefreq: "monthly", priority: 0.4 },
  ];

  const browserPages = browsers.map((b) => ({
    loc: `/reviews/${b.slug}`,
    changefreq: "weekly",
    priority: b.demo_rank === 1 ? 0.95 : b.demo_rank <= 10 ? 0.85 : 0.75,
  }));

  const mcpPages = mcpTools.map((m) => ({
    loc: `/mcp/${m.slug}`,
    changefreq: "weekly",
    priority: m.demo_rank === 1 ? 0.95 : m.demo_rank <= 10 ? 0.85 : 0.75,
  }));

  const popularComparisons = [
    { loc: "/compare/2captcha-browser-api-vs-browserbase", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare/2captcha-browser-api-vs-brightdata-scraping-browser", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare/2captcha-browser-api-vs-steel-dev", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare/2captcha-browser-api-vs-browserless", changefreq: "weekly", priority: 0.75 },
    { loc: "/compare/2captcha-browser-api-vs-anchorbrowser", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare/2captcha-browser-api-vs-hyperbrowser", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare/2captcha-browser-api-vs-kernel-sh", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare/2captcha-browser-api-vs-browser-use", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare/2captcha-browser-api-vs-lightpanda", changefreq: "weekly", priority: 0.75 },
    { loc: "/compare/2captcha-browser-mcp-vs-browserbase-mcp", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare/2captcha-browser-mcp-vs-browser-use-mcp", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare/2captcha-browser-mcp-vs-steel-mcp", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare/2captcha-browser-mcp-vs-kernel-mcp-server", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare/2captcha-browser-mcp-vs-hyperbrowser-mcp", changefreq: "weekly", priority: 0.8 },
  ];

  const alternativeSlugs = [
    "browserbase",
    "brightdata-scraping-browser",
    "browserless",
    "zenrows-browser",
    "steel-dev",
    "hyperbrowser",
    "oxylabs-agent-browser",
    "browser-use",
    "scrapfly-cloud-browser",
    "scrapeless"
  ];

  const alternativePages = alternativeSlugs.map((slug) => ({
    loc: `/alternatives/${slug}`,
    changefreq: "weekly",
    priority: 0.85,
  }));

  const bestForSlugs = [
    "turnstile-bypass",
    "claude-desktop",
    "cursor",
    "pay-as-you-go",
    "residential-proxies",
    "datadome"
  ];

  const bestForPages = bestForSlugs.map((slug) => ({
    loc: `/best-for/${slug}`,
    changefreq: "weekly",
    priority: 0.85,
  }));

  const guidePages = [
    { loc: "/guides", changefreq: "daily", priority: 0.85 },
    { loc: "/guides/how-to-connect-puppeteer-cloud-browser", changefreq: "weekly", priority: 0.8 },
    { loc: "/guides/how-to-connect-playwright-cloud-browser", changefreq: "weekly", priority: 0.8 },
    { loc: "/guides/how-to-configure-claude-desktop-browser-mcp", changefreq: "weekly", priority: 0.8 },
    { loc: "/guides/how-to-bypass-cloudflare-turnstile-cloud-browsers", changefreq: "weekly", priority: 0.8 },
  ];

  const topicPages = [
    { loc: "/what-is-a-headless-browser", changefreq: "weekly", priority: 0.85 },
    { loc: "/topics", changefreq: "weekly", priority: 0.85 },
    { loc: "/topics/headless-browser-api", changefreq: "weekly", priority: 0.8 },
    { loc: "/topics/headless-chrome-docker-aws-lambda", changefreq: "weekly", priority: 0.8 },
    { loc: "/topics/selenium-headless-chrome-python", changefreq: "weekly", priority: 0.8 },
    { loc: "/topics/headless-browser-node-js", changefreq: "weekly", priority: 0.8 },
    { loc: "/topics/phantomjs-alternatives", changefreq: "weekly", priority: 0.8 },
    { loc: "/topics/browser-for-ai-agents", changefreq: "weekly", priority: 0.8 },
  ];

  const allUrls = [
    ...staticPages,
    ...browserPages,
    ...mcpPages,
    ...popularComparisons,
    ...alternativePages,
    ...bestForPages,
    ...guidePages,
    ...topicPages
  ];
  const nowIso = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${origin}${u.loc}</loc>
    <lastmod>${nowIso}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(2)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
