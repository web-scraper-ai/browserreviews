import type { APIRoute } from "astro";
import { getSiteOrigin } from "../utils/site-url";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const siteUrl = getSiteOrigin(url.origin);

  const content = [
    "User-agent: *",
    "Allow: /",
    "",
    "# Exclude admin and internal CMS routes",
    "Disallow: /_emdash/",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
