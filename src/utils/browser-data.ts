import { getEmDashCollection, getEmDashEntry } from "emdash";
import { CLOUD_BROWSERS } from "../../scripts/data-browsers.mjs";
import { BROWSER_MCP_TOOLS } from "../../scripts/data-mcp.mjs";
import { TRUST_PAGES } from "../../scripts/data-pages.mjs";

export interface CloudBrowserItem {
  id: string;
  slug: string;
  name: string;
  demo_rank: number;
  tagline: string;
  website_url: string;
  affiliate_url: string;
  status_badge: string;
  overall_score: number;
  starting_price_hour: number;
  starting_price_request: number;
  pricing_model: string;
  free_tier: string;
  cdp_support: boolean;
  playwright_support: boolean;
  puppeteer_support: boolean;
  selenium_support: boolean;
  stealth_fingerprinting: string;
  antibot_bypass: string;
  captcha_auto_solve: string;
  proxy_integration: string;
  mcp_support: boolean;
  mcp_slug: string;
  max_concurrency: string;
  pros: Array<{ text: string }>;
  cons: Array<{ text: string }>;
  verdict: string;
  ideal_use_case: string;
  avoid_if: string;
  summary: string;
  year_founded?: number;
  features: string[];
  operational_status: string;
  content?: any;
}

export interface McpToolItem {
  id: string;
  slug: string;
  name: string;
  demo_rank: number;
  tagline: string;
  website_url: string;
  affiliate_url: string;
  github_url?: string;
  status_badge: string;
  overall_score: number;
  provider_slug: string;
  install_command: string;
  config_snippet: string;
  tools_provided: string[];
  supports_claude_desktop: boolean;
  supports_cursor: boolean;
  supports_custom_agents: boolean;
  captcha_solving: string;
  stealth_bypass: string;
  pricing_tier: string;
  pros: Array<{ text: string }>;
  cons: Array<{ text: string }>;
  verdict: string;
  ideal_use_case: string;
  avoid_if: string;
  summary: string;
  features: string[];
  content?: any;
}

export interface TrustPageItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  summary?: string;
  content: string | any;
}

// Normalized fallbacks
const FALLBACK_BROWSERS: CloudBrowserItem[] = (CLOUD_BROWSERS as any[]).map(b => ({
  ...b,
  id: b.slug,
}));

const FALLBACK_MCP: McpToolItem[] = (BROWSER_MCP_TOOLS as any[]).map(m => ({
  ...m,
  id: m.slug,
}));

const FALLBACK_PAGES: TrustPageItem[] = (TRUST_PAGES as any[]).map(p => ({
  ...p,
  id: p.slug,
}));

export async function fetchAllBrowsers(): Promise<{ browsers: CloudBrowserItem[]; cacheHint?: any }> {
  try {
    const { entries, cacheHint } = await getEmDashCollection("browsers");
    if (entries && entries.length > 0) {
      const mapped = entries.map((e: any) => ({
        id: e.id,
        slug: e.id,
        name: e.data.name || e.data.title,
        demo_rank: e.data.demo_rank || 99,
        tagline: e.data.tagline || "",
        website_url: e.data.website_url || "",
        affiliate_url: e.data.affiliate_url || e.data.website_url,
        status_badge: e.data.status_badge || "",
        overall_score: e.data.overall_score || 8.0,
        starting_price_hour: e.data.starting_price_hour || 0.20,
        starting_price_request: e.data.starting_price_request || 1.0,
        pricing_model: e.data.pricing_model || "pay_as_you_go",
        free_tier: e.data.free_tier || "",
        cdp_support: e.data.cdp_support ?? true,
        playwright_support: e.data.playwright_support ?? true,
        puppeteer_support: e.data.puppeteer_support ?? true,
        selenium_support: e.data.selenium_support ?? false,
        stealth_fingerprinting: e.data.stealth_fingerprinting || "",
        antibot_bypass: e.data.antibot_bypass || "",
        captcha_auto_solve: e.data.captcha_auto_solve || "",
        proxy_integration: e.data.proxy_integration || "",
        mcp_support: e.data.mcp_support ?? false,
        mcp_slug: e.data.mcp_slug || "",
        max_concurrency: e.data.max_concurrency || "",
        pros: e.data.pros || [],
        cons: e.data.cons || [],
        verdict: e.data.verdict || "",
        ideal_use_case: e.data.ideal_use_case || "",
        avoid_if: e.data.avoid_if || "",
        summary: e.data.summary || "",
        year_founded: e.data.year_founded || 2024,
        features: e.data.features || [],
        operational_status: e.data.operational_status || "active",
        content: e.data.content,
      }));
      // Sort by rank
      mapped.sort((a, b) => a.demo_rank - b.demo_rank);
      return { browsers: mapped, cacheHint };
    }
  } catch (err) {
    // Database initializing or offline
  }

  const fallback = [...FALLBACK_BROWSERS].sort((a, b) => a.demo_rank - b.demo_rank);
  return { browsers: fallback };
}

export async function fetchBrowserBySlug(slug: string): Promise<{ browser: CloudBrowserItem | null; cacheHint?: any }> {
  try {
    const { entry, cacheHint } = await getEmDashEntry("browsers", slug);
    if (entry && entry.data) {
      const e = entry;
      const item: CloudBrowserItem = {
        id: e.id,
        slug: e.id,
        name: e.data.name || e.data.title,
        demo_rank: e.data.demo_rank || 99,
        tagline: e.data.tagline || "",
        website_url: e.data.website_url || "",
        affiliate_url: e.data.affiliate_url || e.data.website_url,
        status_badge: e.data.status_badge || "",
        overall_score: e.data.overall_score || 8.0,
        starting_price_hour: e.data.starting_price_hour || 0.20,
        starting_price_request: e.data.starting_price_request || 1.0,
        pricing_model: e.data.pricing_model || "pay_as_you_go",
        free_tier: e.data.free_tier || "",
        cdp_support: e.data.cdp_support ?? true,
        playwright_support: e.data.playwright_support ?? true,
        puppeteer_support: e.data.puppeteer_support ?? true,
        selenium_support: e.data.selenium_support ?? false,
        stealth_fingerprinting: e.data.stealth_fingerprinting || "",
        antibot_bypass: e.data.antibot_bypass || "",
        captcha_auto_solve: e.data.captcha_auto_solve || "",
        proxy_integration: e.data.proxy_integration || "",
        mcp_support: e.data.mcp_support ?? false,
        mcp_slug: e.data.mcp_slug || "",
        max_concurrency: e.data.max_concurrency || "",
        pros: e.data.pros || [],
        cons: e.data.cons || [],
        verdict: e.data.verdict || "",
        ideal_use_case: e.data.ideal_use_case || "",
        avoid_if: e.data.avoid_if || "",
        summary: e.data.summary || "",
        year_founded: e.data.year_founded || 2024,
        features: e.data.features || [],
        operational_status: e.data.operational_status || "active",
        content: e.data.content,
      };
      return { browser: item, cacheHint };
    }
  } catch (err) {
    // Database initializing or offline
  }

  const match = FALLBACK_BROWSERS.find(b => b.slug === slug) || null;
  return { browser: match };
}

export async function fetchAllMcpTools(): Promise<{ tools: McpToolItem[]; cacheHint?: any }> {
  try {
    const { entries, cacheHint } = await getEmDashCollection("mcp_tools");
    if (entries && entries.length > 0) {
      const mapped = entries.map((e: any) => ({
        id: e.id,
        slug: e.id,
        name: e.data.name || e.data.title,
        demo_rank: e.data.demo_rank || 99,
        tagline: e.data.tagline || "",
        website_url: e.data.website_url || "",
        affiliate_url: e.data.affiliate_url || e.data.website_url,
        github_url: e.data.github_url || "",
        status_badge: e.data.status_badge || "",
        overall_score: e.data.overall_score || 8.0,
        provider_slug: e.data.provider_slug || "",
        install_command: e.data.install_command || "",
        config_snippet: e.data.config_snippet || "",
        tools_provided: e.data.tools_provided || [],
        supports_claude_desktop: e.data.supports_claude_desktop ?? true,
        supports_cursor: e.data.supports_cursor ?? true,
        supports_custom_agents: e.data.supports_custom_agents ?? true,
        captcha_solving: e.data.captcha_solving || "",
        stealth_bypass: e.data.stealth_bypass || "",
        pricing_tier: e.data.pricing_tier || "",
        pros: e.data.pros || [],
        cons: e.data.cons || [],
        verdict: e.data.verdict || "",
        ideal_use_case: e.data.ideal_use_case || "",
        avoid_if: e.data.avoid_if || "",
        summary: e.data.summary || "",
        features: e.data.features || [],
        content: e.data.content,
      }));
      mapped.sort((a, b) => a.demo_rank - b.demo_rank);
      return { tools: mapped, cacheHint };
    }
  } catch (err) {
    // Database initializing or offline
  }

  const fallback = [...FALLBACK_MCP].sort((a, b) => a.demo_rank - b.demo_rank);
  return { tools: fallback };
}

export async function fetchMcpToolBySlug(slug: string): Promise<{ tool: McpToolItem | null; cacheHint?: any }> {
  try {
    const { entry, cacheHint } = await getEmDashEntry("mcp_tools", slug);
    if (entry && entry.data) {
      const e = entry;
      const item: McpToolItem = {
        id: e.id,
        slug: e.id,
        name: e.data.name || e.data.title,
        demo_rank: e.data.demo_rank || 99,
        tagline: e.data.tagline || "",
        website_url: e.data.website_url || "",
        affiliate_url: e.data.affiliate_url || e.data.website_url,
        github_url: e.data.github_url || "",
        status_badge: e.data.status_badge || "",
        overall_score: e.data.overall_score || 8.0,
        provider_slug: e.data.provider_slug || "",
        install_command: e.data.install_command || "",
        config_snippet: e.data.config_snippet || "",
        tools_provided: e.data.tools_provided || [],
        supports_claude_desktop: e.data.supports_claude_desktop ?? true,
        supports_cursor: e.data.supports_cursor ?? true,
        supports_custom_agents: e.data.supports_custom_agents ?? true,
        captcha_solving: e.data.captcha_solving || "",
        stealth_bypass: e.data.stealth_bypass || "",
        pricing_tier: e.data.pricing_tier || "",
        pros: e.data.pros || [],
        cons: e.data.cons || [],
        verdict: e.data.verdict || "",
        ideal_use_case: e.data.ideal_use_case || "",
        avoid_if: e.data.avoid_if || "",
        summary: e.data.summary || "",
        features: e.data.features || [],
        content: e.data.content,
      };
      return { tool: item, cacheHint };
    }
  } catch (err) {
    // Database initializing or offline
  }

  const match = FALLBACK_MCP.find(m => m.slug === slug) || null;
  return { tool: match };
}

export async function fetchTrustPage(slug: string): Promise<{ page: TrustPageItem | null; cacheHint?: any }> {
  try {
    const { entry, cacheHint } = await getEmDashEntry("pages", slug);
    if (entry && entry.data) {
      return {
        page: {
          id: entry.id,
          slug: entry.id,
          title: entry.data.title,
          subtitle: entry.data.subtitle,
          summary: entry.data.summary,
          content: entry.data.content,
        },
        cacheHint,
      };
    }
  } catch (err) {
    // Database initializing or offline
  }

  const match = FALLBACK_PAGES.find(p => p.slug === slug) || null;
  return { page: match };
}
