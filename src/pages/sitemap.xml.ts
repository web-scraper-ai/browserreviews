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
    { loc: "/calculator", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare", changefreq: "weekly", priority: 0.8 },
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
    { loc: "/compare/2captcha-browser-mcp-vs-browserbase-mcp", changefreq: "weekly", priority: 0.8 },
    { loc: "/compare/2captcha-browser-mcp-vs-browser-use-mcp", changefreq: "weekly", priority: 0.8 },
  ];

  const allUrls = [...staticPages, ...browserPages, ...mcpPages, ...popularComparisons];
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
