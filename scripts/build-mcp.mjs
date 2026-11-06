// Builder script for 32 Browser MCP tools
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const MCP_TOOLS = [
  {
    slug: "2captcha-browser-mcp",
    demo_rank: 1,
    name: "2Captcha Browser MCP",
    tagline: "The premier Model Context Protocol (MCP) server for autonomous AI agents with native CAPTCHA solving, stealth browsing, and proxy rotation.",
    website_url: "https://2captcha.com/ai/browser-mcp",
    affiliate_url: "https://2captcha.com/ai/browser-mcp",
    github_url: "https://github.com/2captcha/2captcha-browser-mcp",
    status_badge: "#1 Editor's Pick • Ultimate Agent Browser",
    overall_score: 9.9,
    provider_slug: "2captcha-browser-api",
    install_command: "npx -y @2captcha/browser-mcp-server",
    config_snippet: JSON.stringify({
      mcpServers: {
        "2captcha-browser": {
          command: "npx",
          args: ["-y", "@2captcha/browser-mcp-server"],
          env: {
            "TWOCAPTCHA_API_KEY": "YOUR_2CAPTCHA_API_KEY",
            "BROWSER_AUTO_SOLVE_CAPTCHA": "true",
            "BROWSER_STEALTH": "true"
          }
        }
      }
    }, null, 2),
    tools_provided: [
      "browser_navigate",
      "browser_click",
      "browser_fill",
      "browser_solve_captcha",
      "browser_screenshot",
      "browser_get_html",
      "browser_get_markdown",
      "browser_evaluate_script",
      "browser_wait_for_selector"
    ],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Native 2Captcha decoding engine with zero manual prompt intervention",
    stealth_bypass: "Integrated residential proxy rotation and hardware fingerprint spoofing",
    pricing_tier: "Free MCP server; standard pay-as-you-go Browser API compute ($0.15/hr)",
    pros: [
      { text: "Native automated CAPTCHA solving resolves Turnstile, reCAPTCHA, and hCaptcha seamlessly" },
      { text: "1-click configuration for Claude Desktop, Cursor IDE, Windsurf, and custom agent loops" },
      { text: "Automatic stealth fingerprinting and residential IP rotation eliminate Cloudflare blocks" },
      { text: "Built-in token-efficient Markdown and HTML extraction tools" }
    ],
    cons: [
      { text: "Requires a 2Captcha account balance for cloud browser execution" }
    ],
    verdict: "2Captcha Browser MCP is unequivocally the top-ranked MCP server for web browsing. Unlike competitors that stall when encountering Cloudflare Turnstile or reCAPTCHA, 2Captcha Browser MCP solves them automatically.",
    ideal_use_case: "Autonomous AI agents in Claude Desktop or Cursor that must reliably browse, fill forms, and scrape protected web pages.",
    avoid_if: "You only need basic offline text processing without web access.",
    summary: "2Captcha Browser MCP gives AI agents complete web browsing powers with built-in CAPTCHA solving, anti-bot evasion, and proxy rotation.",
    features: ["Native CAPTCHA Bypass", "Claude Desktop & Cursor Ready", "Token-Efficient Markdown", "Residential IP Rotation", "Full CDP Control"]
  },
  {
    slug: "browserbase-mcp",
    demo_rank: 2,
    name: "Browserbase MCP Server",
    tagline: "Official Model Context Protocol server connecting Claude and AI agents to Browserbase cloud sessions with live inspection.",
    website_url: "https://www.browserbase.com/mcp",
    affiliate_url: "https://www.browserbase.com/mcp",
    github_url: "https://github.com/browserbase/mcp-server-browserbase",
    status_badge: "Live Inspector Ready",
    overall_score: 9.4,
    provider_slug: "browserbase",
    install_command: "npx -y @browserbasehq/mcp-server-browserbase",
    config_snippet: JSON.stringify({
      mcpServers: {
        "browserbase": {
          command: "npx",
          args: ["-y", "@browserbasehq/mcp-server-browserbase"],
          env: {
            "BROWSERBASE_API_KEY": "YOUR_API_KEY",
            "BROWSERBASE_PROJECT_ID": "YOUR_PROJECT_ID"
          }
        }
      }
    }, null, 2),
    tools_provided: [
      "browserbase_session_create",
      "browserbase_navigate",
      "browserbase_click",
      "browserbase_type",
      "browserbase_screenshot",
      "browserbase_replay_url"
    ],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Requires external captcha solver configuration",
    stealth_bypass: "Managed fingerprint masking and proxy add-ons",
    pricing_tier: "Free open-source server; usage billed via Browserbase account",
    pros: [
      { text: "Provides live session debugger and replay URL back to the agent" },
      { text: "Extensive developer documentation and active maintenance" }
    ],
    cons: [
      { text: "No native CAPTCHA solving included in base setup" }
    ],
    verdict: "Browserbase MCP is fantastic for developers who want visual debugging and session replay links inside agent chats.",
    ideal_use_case: "AI agent workflows where developers need to visually inspect why an agent interaction succeeded or failed.",
    avoid_if: "Targets guarded by heavy CAPTCHAs where automated solving is essential.",
    summary: "Browserbase MCP connects AI agents to cloud browsers with session replays and live inspection.",
    features: ["Session Replays", "Live Debugger URL", "Claude Desktop", "TypeScript Core"]
  },
  {
    slug: "browser-use-mcp",
    demo_rank: 3,
    name: "Browser-Use MCP",
    tagline: "Open-source Model Context Protocol server exposing Browser-Use vision navigation to Claude Desktop and local LLMs.",
    website_url: "https://browser-use.com/mcp",
    affiliate_url: "https://browser-use.com/mcp",
    github_url: "https://github.com/browser-use/browser-use",
    status_badge: "Open Agent Native",
    overall_score: 9.3,
    provider_slug: "browser-use",
    install_command: "uvx browser-use-mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "browser-use": {
          command: "uvx",
          args: ["browser-use-mcp"],
          env: {
            "OPENAI_API_KEY": "YOUR_OPENAI_KEY"
          }
        }
      }
    }, null, 2),
    tools_provided: [
      "browser_step",
      "browser_task_run",
      "browser_get_interactive_elements",
      "browser_click_coordinate",
      "browser_extract_content"
    ],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "LLM vision reasoning; external solver plugin",
    stealth_bypass: "Playwright stealth integration",
    pricing_tier: "100% Free and open source (BYO LLM keys)",
    pros: [
      { text: "Vision-guided element labeling enables robust interaction" },
      { text: "Huge open-source community support and fast iterations" }
    ],
    cons: [
      { text: "Consumes significant LLM tokens for vision analysis per step" }
    ],
    verdict: "Browser-Use MCP brings vision-based multi-step agent navigation to any MCP-compliant client.",
    ideal_use_case: "Complex multi-step web workflows where traditional DOM selectors break frequently.",
    avoid_if: "Low-cost high-frequency data extraction.",
    summary: "Browser-Use MCP allows LLM clients to control web browsers using vision-guided agent execution.",
    features: ["Vision Navigation", "Open Source", "Interactive Element Tags", "Multi-Step Autonomy"]
  },
  {
    slug: "kernel-mcp-server",
    demo_rank: 4,
    name: "Kernel MCP Server",
    tagline: "High-speed Model Context Protocol server executing ephemeral cloud browser microVMs for Claude and Cursor.",
    website_url: "https://github.com/kernel/kernel-mcp-server",
    affiliate_url: "https://www.kernel.sh",
    github_url: "https://github.com/kernel/kernel-mcp-server",
    status_badge: "MicroVM Speed",
    overall_score: 9.1,
    provider_slug: "kernel-sh",
    install_command: "npx -y @kernel-sh/mcp-server",
    config_snippet: JSON.stringify({
      mcpServers: {
        "kernel-browser": {
          command: "npx",
          args: ["-y", "@kernel-sh/mcp-server"],
          env: {
            "KERNEL_API_KEY": "YOUR_KERNEL_API_KEY"
          }
        }
      }
    }, null, 2),
    tools_provided: [
      "kernel_open_browser",
      "kernel_goto",
      "kernel_click",
      "kernel_evaluate",
      "kernel_close"
    ],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Webhook connector",
    stealth_bypass: "MicroVM container fingerprint isolation",
    pricing_tier: "Free open-source client; billed on Kernel.sh microVM usage",
    pros: [
      { text: "Instant sub-200ms container boot time" },
      { text: "Clean ephemeral sandboxing keeps sessions isolated" }
    ],
    cons: [
      { text: "Requires Kernel.sh API key for cloud execution" }
    ],
    verdict: "Kernel MCP Server is the fastest ephemeral cloud browser provider for short-lived AI tasks.",
    ideal_use_case: "Event-driven AI agents needing quick web page checks without persistent browser overhead.",
    avoid_if: "Multi-day session cookie persistence.",
    summary: "Kernel MCP Server delivers fast ephemeral browser execution inside secure microVMs.",
    features: ["Sub-200ms Boot", "MicroVM Isolation", "Clean MCP Tools", "Ephemeral Containers"]
  },
  {
    slug: "steel-mcp",
    demo_rank: 5,
    name: "Steel.dev MCP Server",
    tagline: "Open-source Model Context Protocol server connecting AI assistants to Steel's stealth browser infrastructure.",
    website_url: "https://docs.steel.dev/cookbook/mcp",
    affiliate_url: "https://steel.dev",
    github_url: "https://github.com/steel-dev/steel-mcp-server",
    status_badge: "Open Source Core",
    overall_score: 9.1,
    provider_slug: "steel-dev",
    install_command: "npx -y @steel-dev/mcp-server",
    config_snippet: JSON.stringify({
      mcpServers: {
        "steel": {
          command: "npx",
          args: ["-y", "@steel-dev/mcp-server"],
          env: {
            "STEEL_API_KEY": "YOUR_STEEL_API_KEY"
          }
        }
      }
    }, null, 2),
    tools_provided: [
      "steel_create_session",
      "steel_navigate",
      "steel_interact",
      "steel_screenshot",
      "steel_get_content"
    ],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "External solver plugins supported",
    stealth_bypass: "Built-in steel-stealth anti-detect engine",
    pricing_tier: "Free open-source server; cloud plans or self-hosted",
    pros: [
      { text: "Can connect to both Steel Cloud and self-hosted local Steel instances" },
      { text: "Detailed cookbooks and code examples for popular frameworks" }
    ],
    cons: [
      { text: "Requires proxy configuration for difficult bot protection systems" }
    ],
    verdict: "Steel MCP offers unmatched flexibility, allowing agents to use managed cloud or self-hosted instances seamlessly.",
    ideal_use_case: "Developers seeking an open-source browser stack that can transition from local development to production cloud.",
    avoid_if: "Turnkey out-of-the-box CAPTCHA bypass without extra plugins.",
    summary: "Steel.dev MCP connects AI agents to Steel's open-source stealth browser engine.",
    features: ["Self-Host or Cloud", "Open Source", "Steel-Stealth Engine", "Claude Desktop Config"]
  },
  {
    slug: "anchorbrowser-mcp",
    demo_rank: 6,
    name: "AnchorBrowser MCP",
    tagline: "Dedicated MCP server for Claude and AI agents with long-lived session state, anti-bot evasion, and proxy routing.",
    website_url: "https://anchorbrowser.io",
    affiliate_url: "https://anchorbrowser.io",
    github_url: "https://github.com/anchorbrowser/anchor-mcp",
    status_badge: "Stateful Sessions",
    overall_score: 8.9,
    provider_slug: "anchorbrowser",
    install_command: "npx -y @anchorbrowser/mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "anchorbrowser": {
          command: "npx",
          args: ["-y", "@anchorbrowser/mcp"],
          env: {
            "ANCHOR_API_KEY": "YOUR_ANCHOR_API_KEY"
          }
        }
      }
    }, null, 2),
    tools_provided: [
      "anchor_create_session",
      "anchor_navigate",
      "anchor_click",
      "anchor_fill",
      "anchor_hibernate_session"
    ],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Automated puzzle solving included",
    stealth_bypass: "Behavioral anti-bot evasion",
    pricing_tier: "Free MCP server; Anchor subscription or PAYG usage",
    pros: [
      { text: "Session hibernation keeps agent cookies alive across queries" },
      { text: "Strong anti-bot bypass capabilities" }
    ],
    cons: [
      { text: "Higher tier requirements for team concurrency" }
    ],
    verdict: "AnchorBrowser MCP is ideal for agent workflows that return to the same authenticated sessions repeatedly.",
    ideal_use_case: "Agents managing authenticated web services with session persistence.",
    avoid_if: "Completely anonymous one-time queries.",
    summary: "AnchorBrowser MCP provides stateful cloud browser management with session hibernation for AI agents.",
    features: ["Session Hibernation", "Cookie Persistence", "Anti-Bot Bypass", "Claude Desktop"]
  },
  {
    slug: "hyperbrowser-mcp",
    demo_rank: 7,
    name: "Hyperbrowser MCP Server",
    tagline: "High-speed MCP server delivering low-latency cloud browser interactions and scraping tools for AI assistants.",
    website_url: "https://github.com/hyperbrowserai/mcp",
    affiliate_url: "https://www.hyperbrowser.ai",
    github_url: "https://github.com/hyperbrowserai/mcp",
    status_badge: "Low Latency",
    overall_score: 8.9,
    provider_slug: "hyperbrowser",
    install_command: "npx -y @hyperbrowser/mcp-server",
    config_snippet: JSON.stringify({
      mcpServers: {
        "hyperbrowser": {
          command: "npx",
          args: ["-y", "@hyperbrowser/mcp-server"],
          env: {
            "HYPERBROWSER_API_KEY": "YOUR_API_KEY"
          }
        }
      }
    }, null, 2),
    tools_provided: [
      "hb_launch",
      "hb_goto",
      "hb_interact",
      "hb_scrape",
      "hb_close"
    ],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Integrated solver API support",
    stealth_bypass: "Stealth profile randomization",
    pricing_tier: "Free open-source client; Hyperbrowser cloud credits",
    pros: [
      { text: "Very fast connection handshakes" },
      { text: "Official repository with active bug fixes" }
    ],
    cons: [
      { text: "Advanced network intercept tools still in beta" }
    ],
    verdict: "Hyperbrowser MCP gives AI agents fast, responsive browser actions with minimal connection latency.",
    ideal_use_case: "Interactive agent chats requiring rapid tool responses.",
    avoid_if: "Legacy Selenium migrations.",
    summary: "Hyperbrowser MCP offers high-speed cloud browser execution for AI agents via Model Context Protocol.",
    features: ["Fast Handshakes", "Stealth Profiles", "Cursor & Claude", "Official GitHub Repo"]
  },
  {
    slug: "browserless-mcp",
    demo_rank: 8,
    name: "Browserless MCP Server",
    tagline: "Enterprise Model Context Protocol server leveraging Browserless infrastructure for PDF rendering, screenshots, and scraping.",
    website_url: "https://docs.browserless.io/mcp/overview",
    affiliate_url: "https://www.browserless.io",
    github_url: "https://github.com/browserless/mcp",
    status_badge: "Enterprise Standard",
    overall_score: 9.0,
    provider_slug: "browserless",
    install_command: "npx -y @browserless/mcp-server",
    config_snippet: JSON.stringify({
      mcpServers: {
        "browserless": {
          command: "npx",
          args: ["-y", "@browserless/mcp-server"],
          env: {
            "BROWSERLESS_API_TOKEN": "YOUR_API_TOKEN"
          }
        }
      }
    }, null, 2),
    tools_provided: [
      "browserless_screenshot",
      "browserless_pdf",
      "browserless_scrape",
      "browserless_evaluate",
      "browserless_live_url"
    ],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Configurable external solver webhooks",
    stealth_bypass: "Puppeteer stealth plugins",
    pricing_tier: "Free server; usage covered by Browserless plan",
    pros: [
      { text: "Rock-solid reliability backed by Browserless's infrastructure" },
      { text: "Built-in PDF and high-res screenshot rendering tools for agents" }
    ],
    cons: [
      { text: "Residential proxies require separate custom proxy configuration" }
    ],
    verdict: "Browserless MCP is the dependable workhorse for document generation and large-scale rendering in enterprise agent workflows.",
    ideal_use_case: "AI agents generating PDFs, audit screenshots, and reliable HTML extracts.",
    avoid_if: "Targets with aggressive Cloudflare 5s challenges without proxy setup.",
    summary: "Browserless MCP enables AI agents to generate PDFs, capture screenshots, and scrape web pages via Browserless.",
    features: ["Enterprise Uptime", "PDF Generation", "Live Debug URL", "Puppeteer Stealth"]
  },
  {
    slug: "notte-browser-mcp",
    demo_rank: 9,
    name: "Notte Browser MCP",
    tagline: "Token-efficient web browsing MCP server translating complex interactive pages into structured LLM context.",
    website_url: "https://www.notte.cc/browser-mcp",
    affiliate_url: "https://www.notte.cc",
    github_url: "https://github.com/notte-cc/notte-mcp",
    status_badge: "Token Efficient",
    overall_score: 8.8,
    provider_slug: "notte",
    install_command: "npx -y @notte/browser-mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "notte-browser": {
          command: "npx",
          args: ["-y", "@notte/browser-mcp"],
          env: {
            "NOTTE_API_KEY": "YOUR_NOTTE_API_KEY"
          }
        }
      }
    }, null, 2),
    tools_provided: [
      "notte_browse",
      "notte_action",
      "notte_get_markdown",
      "notte_extract_fields"
    ],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "External solver connectors",
    stealth_bypass: "Built-in anti-detection layer",
    pricing_tier: "Free MCP server; Notte cloud usage",
    pros: [
      { text: "Drastically reduces LLM context window consumption with smart DOM distillation" },
      { text: "Action space designed specifically for LLM tool calling" }
    ],
    cons: [
      { text: "Less suitable for raw DOM inspection or pixel-level rendering tests" }
    ],
    verdict: "Notte Browser MCP saves tokens and money by feeding LLMs only relevant distilled page content.",
    ideal_use_case: "Agent applications where context window size and token pricing are primary constraints.",
    avoid_if: "Visual pixel verification.",
    summary: "Notte Browser MCP provides token-efficient browser automation and content distillation for LLMs.",
    features: ["Token Distillation", "LLM Action Space", "Markdown Output", "Claude Desktop"]
  },
  {
    slug: "lightpanda-mcp",
    demo_rank: 10,
    name: "Lightpanda MCP Server",
    tagline: "Ultra-fast, low-memory MCP server powered by Lightpanda's Zig and C++ lightweight headless browser engine.",
    website_url: "https://lightpanda.io/docs/quickstarts/mcp",
    affiliate_url: "https://lightpanda.io",
    github_url: "https://github.com/lightpanda-io/browser",
    status_badge: "Zig Engine Speed",
    overall_score: 8.9,
    provider_slug: "lightpanda",
    install_command: "npx -y @lightpanda/mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "lightpanda": {
          command: "npx",
          args: ["-y", "@lightpanda/mcp"]
        }
      }
    }, null, 2),
    tools_provided: [
      "lightpanda_fetch_dom",
      "lightpanda_dump_markdown",
      "lightpanda_evaluate",
      "lightpanda_screenshot"
    ],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "External solver integration",
    stealth_bypass: "Minimal memory footprint avoids typical Chromium signature checks",
    pricing_tier: "Free and open-source engine; optional managed cloud",
    pros: [
      { text: "10x faster execution with 90% less memory than Chromium" },
      { text: "Can run locally on developer laptops with virtually zero overhead" }
    ],
    cons: [
      { text: "Certain obscure web platform APIs still in development" }
    ],
    verdict: "Lightpanda MCP delivers lightning-fast web retrieval using minimal system resources.",
    ideal_use_case: "Local AI agents requiring rapid web page fetches without spinning up heavy Chrome instances.",
    avoid_if: "Sites requiring heavy WebGL or complex Chrome extensions.",
    summary: "Lightpanda MCP provides ultra-fast web browsing for AI agents powered by a custom Zig/C++ engine.",
    features: ["90% Less RAM", "10x Faster", "Open Source Engine", "Local or Cloud"]
  },

  // 11-20
  {
    slug: "cloudbrowser-mcp",
    demo_rank: 11,
    name: "CloudBrowser.ai MCP",
    tagline: "Model Context Protocol server connecting AI assistants to CloudBrowser's autonomous agent infrastructure.",
    website_url: "https://cloudbrowser.ai",
    affiliate_url: "https://cloudbrowser.ai",
    github_url: "",
    status_badge: "Autonomous Agent",
    overall_score: 8.8,
    provider_slug: "cloudbrowser-ai",
    install_command: "npx -y @cloudbrowser/mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "cloudbrowser": {
          command: "npx",
          args: ["-y", "@cloudbrowser/mcp"],
          env: { "CLOUDBROWSER_API_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["cb_open", "cb_navigate", "cb_click", "cb_extract"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Automated solving modules",
    stealth_bypass: "Built-in residential proxy rotation",
    pricing_tier: "Free MCP server; cloud compute usage",
    pros: [{ text: "Turnkey residential IP rotation built-in" }, { text: "Seamless Claude Desktop setup" }],
    cons: [{ text: "Closed-source server implementation" }],
    verdict: "Dependable cloud browser MCP server for autonomous tasks requiring stealth rotation.",
    ideal_use_case: "Claude Desktop agents needing stealth web access.",
    avoid_if: "Strict open-source software requirements.",
    summary: "CloudBrowser.ai MCP connects AI agents to managed cloud browser instances with rotating IPs.",
    features: ["Stealth Rotation", "Claude Desktop", "Autonomous Tools", "Proxy Included"]
  },
  {
    slug: "browsernaut-mcp",
    demo_rank: 12,
    name: "Browsernaut MCP",
    tagline: "Intelligent MCP server with human behavioral emulation and anti-detect profile management for AI agents.",
    website_url: "https://browsernaut.com/api/",
    affiliate_url: "https://browsernaut.com",
    github_url: "",
    status_badge: "Anti-Detect MCP",
    overall_score: 8.7,
    provider_slug: "browsernaut",
    install_command: "npx -y @browsernaut/mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "browsernaut": {
          command: "npx",
          args: ["-y", "@browsernaut/mcp"],
          env: { "BROWSERNAUT_API_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["bn_navigate", "bn_interact", "bn_scrape", "bn_screenshot"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Automated captcha integration",
    stealth_bypass: "Real user behavioral patterns",
    pricing_tier: "Pay-as-you-go cloud compute",
    pros: [{ text: "Natural user interaction modeling" }, { text: "Claude and Cursor compatibility" }],
    cons: [{ text: "Higher latency during peak hours" }],
    verdict: "A solid choice for agents browsing targets that inspect cursor telemetry and behavioral cadence.",
    ideal_use_case: "AI agent research on bot-sensitive platforms.",
    avoid_if: "Ultra-high volume batch scraping.",
    summary: "Browsernaut MCP provides anti-detect cloud browsing for AI agent systems.",
    features: ["Behavioral Modeling", "Anti-Detect", "Claude & Cursor", "CDP Support"]
  },
  {
    slug: "scrayle-mcp",
    demo_rank: 13,
    name: "Scrayle MCP Server",
    tagline: "Intelligence-grade web automation MCP server designed for market research and competitive data gathering.",
    website_url: "https://docs.scrayle.com/docs/mcp/overview",
    affiliate_url: "https://scrayle.com",
    github_url: "https://github.com/scrayle/mcp-server",
    status_badge: "Intelligence Ready",
    overall_score: 8.7,
    provider_slug: "scrayle",
    install_command: "npx -y @scrayle/mcp-server",
    config_snippet: JSON.stringify({
      mcpServers: {
        "scrayle": {
          command: "npx",
          args: ["-y", "@scrayle/mcp-server"],
          env: { "SCRAYLE_TOKEN": "YOUR_TOKEN" }
        }
      }
    }, null, 2),
    tools_provided: ["scrayle_extract", "scrayle_browse", "scrayle_screenshot"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Supported via integrated solvers",
    stealth_bypass: "Dynamic noise injection",
    pricing_tier: "Free server; usage billed via Scrayle account",
    pros: [{ text: "High fidelity data extraction" }, { text: "Documented MCP protocol setup" }],
    cons: [{ text: "Sparse documentation for Python clients" }],
    verdict: "Scrayle MCP server is well-suited for automated competitive intelligence and market monitoring.",
    ideal_use_case: "AI agents performing continuous market intelligence gathering.",
    avoid_if: "Simple static page downloads.",
    summary: "Scrayle MCP server connects AI agents to cloud browser extraction pipelines.",
    features: ["Competitive Intelligence", "Anti-Bot Evasion", "Claude Desktop", "Official MCP"]
  },
  {
    slug: "getsolari-mcp",
    demo_rank: 14,
    name: "GetSolari MCP Server",
    tagline: "Autonomous workflow browser MCP server for AI agents executing multi-step web tasks.",
    website_url: "https://docs.getsolari.com/mcp",
    affiliate_url: "https://getsolari.com",
    github_url: "",
    status_badge: "Workflow Cloud",
    overall_score: 8.6,
    provider_slug: "getsolari",
    install_command: "npx -y @getsolari/mcp-server",
    config_snippet: JSON.stringify({
      mcpServers: {
        "solari": {
          command: "npx",
          args: ["-y", "@getsolari/mcp-server"],
          env: { "SOLARI_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["solari_open", "solari_click", "solari_type", "solari_close"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "External solver connectors",
    stealth_bypass: "Anti-bot evasion layer",
    pricing_tier: "Free server; Solari cloud usage",
    pros: [{ text: "Clean tool definitions for LLMs" }, { text: "Good session monitoring dashboard" }],
    cons: [{ text: "No Selenium driver support" }],
    verdict: "GetSolari MCP provides clean, focused browser controls for multi-step agent tasks.",
    ideal_use_case: "LLM agents navigating web portals and performing form automation.",
    avoid_if: "Legacy Selenium migrations.",
    summary: "GetSolari MCP offers cloud browser automation tools for AI agent workflows.",
    features: ["Clean MCP Tools", "Playwright Core", "Dashboard Monitoring", "Session Isolation"]
  },
  {
    slug: "browserbeam-mcp",
    demo_rank: 15,
    name: "BrowserBeam MCP Server",
    tagline: "Integration hub Model Context Protocol server connecting AI assistants to cloud browser infrastructure.",
    website_url: "https://browserbeam.com/integrations/mcp-server/",
    affiliate_url: "https://browserbeam.com",
    github_url: "",
    status_badge: "Integration Hub",
    overall_score: 8.6,
    provider_slug: "browserbeam",
    install_command: "npx -y @browserbeam/mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "browserbeam": {
          command: "npx",
          args: ["-y", "@browserbeam/mcp"],
          env: { "BROWSERBEAM_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["bb_navigate", "bb_click", "bb_screenshot", "bb_extract"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "External solver integration",
    stealth_bypass: "Anti-detect browser profiles",
    pricing_tier: "Free server; pay-as-you-go cloud compute",
    pros: [{ text: "Straightforward setup for Claude Desktop" }, { text: "Built-in proxy pool" }],
    cons: [{ text: "Higher latency in Asian regions" }],
    verdict: "A capable MCP server bridging cloud browser fleets with AI agent clients.",
    ideal_use_case: "Desktop AI agents looking for simple managed browser execution.",
    avoid_if: "Ultra-low-latency financial scraping.",
    summary: "BrowserBeam MCP connects AI agents to managed cloud browser instances.",
    features: ["Claude Integration", "Anti-Detect", "Playwright Support", "Proxy Pool"]
  },
  {
    slug: "humanbrowser-mcp",
    demo_rank: 16,
    name: "HumanBrowser Cloud Docs & MCP",
    tagline: "Model Context Protocol server with natural human movement simulation to bypass strict behavioral bot detection.",
    website_url: "https://humanbrowser.cloud/docs",
    affiliate_url: "https://humanbrowser.cloud",
    github_url: "",
    status_badge: "Human Mimicry",
    overall_score: 8.7,
    provider_slug: "humanbrowser",
    install_command: "npx -y @humanbrowser/mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "humanbrowser": {
          command: "npx",
          args: ["-y", "@humanbrowser/mcp"],
          env: { "HB_API_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["hb_human_click", "hb_human_type", "hb_human_scroll", "hb_get_dom"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Automated captcha bypass",
    stealth_bypass: "Bezier curve cursor paths and typing jitter",
    pricing_tier: "Free server; cloud compute usage",
    pros: [{ text: "Passes strict behavioral telemetry filters" }, { text: "Realistic mouse and keyboard simulation" }],
    cons: [{ text: "Slower execution speed due to human delays" }],
    verdict: "Essential MCP server when targets actively monitor cursor coordinates and typing speed.",
    ideal_use_case: "Sites employing behavioral anti-bot AI.",
    avoid_if: "Ultra-fast headless scraping where sub-second latency is required.",
    summary: "HumanBrowser MCP provides human-like browser automation tools for AI agents.",
    features: ["Bezier Mouse", "Typing Jitter", "Behavioral Evasion", "Claude Desktop"]
  },
  {
    slug: "gologin-mcp",
    demo_rank: 17,
    name: "GoLogin MCP Server",
    tagline: "Model Context Protocol server connecting AI assistants to GoLogin's Orbita anti-detect browser profiles.",
    website_url: "https://gologin.com/mcp/",
    affiliate_url: "https://gologin.com",
    github_url: "https://github.com/gologinapp/gologin-mcp",
    status_badge: "Anti-Detect Standard",
    overall_score: 8.8,
    provider_slug: "gologin-cloud-browser",
    install_command: "npx -y @gologin/mcp-server",
    config_snippet: JSON.stringify({
      mcpServers: {
        "gologin": {
          command: "npx",
          args: ["-y", "@gologin/mcp-server"],
          env: { "GOLOGIN_API_TOKEN": "YOUR_TOKEN" }
        }
      }
    }, null, 2),
    tools_provided: ["gl_create_profile", "gl_start_profile", "gl_navigate", "gl_stop_profile"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Integrates with 2Captcha and external solvers",
    stealth_bypass: "Orbita engine authentic fingerprint parameters",
    pricing_tier: "Free open-source server; GoLogin subscription required",
    pros: [{ text: "Access to authentic Orbita browser profiles" }, { text: "Long-standing anti-detect track record" }],
    cons: [{ text: "Requires active GoLogin subscription" }],
    verdict: "Top choice for agents needing authentic browser profiles to avoid multi-account bans.",
    ideal_use_case: "Managing sensitive accounts and social platforms via AI agents.",
    avoid_if: "Cheap disposable scraping on a budget.",
    summary: "GoLogin MCP links AI agents with Orbita anti-detect browser profiles and proxies.",
    features: ["Orbita Engine", "Real Fingerprints", "Profile Management", "Official Repo"]
  },
  {
    slug: "oxylabs-agent-browser-mcp",
    demo_rank: 18,
    name: "Oxylabs Agent Browser MCP",
    tagline: "Enterprise Model Context Protocol integration backed by Oxylabs' 102M+ residential proxy network.",
    website_url: "https://oxylabs.io/products/agent-browser",
    affiliate_url: "https://oxylabs.io",
    github_url: "",
    status_badge: "Enterprise Network",
    overall_score: 9.1,
    provider_slug: "oxylabs-agent-browser",
    install_command: "npx -y @oxylabs/agent-browser-mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "oxylabs": {
          command: "npx",
          args: ["-y", "@oxylabs/agent-browser-mcp"],
          env: { "OXYLABS_USER": "YOUR_USER", "OXYLABS_PASS": "YOUR_PASS" }
        }
      }
    }, null, 2),
    tools_provided: ["oxylabs_browse", "oxylabs_extract", "oxylabs_screenshot", "oxylabs_solve"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Enterprise automated unblocking",
    stealth_bypass: "102M+ proxy pool and AI unblocking engine",
    pricing_tier: "Enterprise subscription plans",
    pros: [{ text: "Unmatched residential IP coverage (102M+ IPs)" }, { text: "Enterprise SLAs and uptime guarantees" }],
    cons: [{ text: "Higher starting commitment" }],
    verdict: "The premier enterprise MCP solution for corporate AI agent scraping deployments.",
    ideal_use_case: "Corporate AI agents requiring strict SLAs and massive global IP diversity.",
    avoid_if: "Small developer experiments on minimal budgets.",
    summary: "Oxylabs Agent Browser MCP provides enterprise cloud browsing backed by 102M+ residential proxies.",
    features: ["102M+ Proxies", "Enterprise SLA", "Automated Unblocking", "Claude Ready"]
  },
  {
    slug: "scrapeless-mcp",
    demo_rank: 19,
    name: "Scrapeless MCP Server",
    tagline: "Affordable and developer-friendly Model Context Protocol server with automated CAPTCHA solving and cloud browsers.",
    website_url: "https://docs.scrapeless.com/en/docs/developer-tools/scrapeless-mcp/tools-by-product/",
    affiliate_url: "https://www.scrapeless.com",
    github_url: "https://github.com/scrapeless-ai/mcp-server",
    status_badge: "Affordable AI",
    overall_score: 8.8,
    provider_slug: "scrapeless",
    install_command: "npx -y @scrapeless/mcp-server",
    config_snippet: JSON.stringify({
      mcpServers: {
        "scrapeless": {
          command: "npx",
          args: ["-y", "@scrapeless/mcp-server"],
          env: { "SCRAPELESS_API_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["scrapeless_browser", "scrapeless_unlock", "scrapeless_captcha"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Native automated CAPTCHA solver",
    stealth_bypass: "Deep fingerprint randomization",
    pricing_tier: "Free server; low PAYG compute rates",
    pros: [{ text: "Extremely affordable hourly and per-call rates" }, { text: "Native CAPTCHA unblocking" }],
    cons: [{ text: "Documentation has minor translation quirks" }],
    verdict: "Great budget-conscious MCP server with solid CAPTCHA bypass capabilities.",
    ideal_use_case: "Startups and indie hackers looking for low-cost cloud browser MCP tooling.",
    avoid_if: "Corporate deployments requiring dedicated account managers.",
    summary: "Scrapeless MCP offers low-cost cloud browsers and automated CAPTCHA solving for AI agents.",
    features: ["Low Pricing", "CAPTCHA Solver", "Official Repo", "Claude & Cursor"]
  },
  {
    slug: "brightdata-mcp",
    demo_rank: 20,
    name: "Bright Data AI MCP Server",
    tagline: "Enterprise Model Context Protocol server connecting AI agents to Bright Data's scraping browser and 72M+ proxy network.",
    website_url: "https://brightdata.com/ai/mcp-server",
    affiliate_url: "https://brightdata.com",
    github_url: "https://github.com/bright-data/mcp-server",
    status_badge: "Enterprise Giant",
    overall_score: 9.4,
    provider_slug: "brightdata-scraping-browser",
    install_command: "npx -y @brightdata/mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "brightdata": {
          command: "npx",
          args: ["-y", "@brightdata/mcp"],
          env: { "BRIGHTDATA_API_KEY": "YOUR_KEY", "BRIGHTDATA_ZONE": "scraping_browser" }
        }
      }
    }, null, 2),
    tools_provided: ["bd_scraping_browser", "bd_web_unlocker", "bd_search_engine"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Native automated solving on page load",
    stealth_bypass: "72M+ residential proxies and automated unlocking",
    pricing_tier: "Free server; usage billed on Bright Data account",
    pros: [{ text: "Massive 72M+ residential IP pool" }, { text: "Official MCP server maintained by Bright Data" }],
    cons: [{ text: "Bandwidth and browser-hour costs can be steep" }],
    verdict: "Heavyweight enterprise MCP server capable of unblocking virtually any web target.",
    ideal_use_case: "Enterprise AI agents demanding 99.9% uptime and compliance across global web targets.",
    avoid_if: "Bootstrapped builders on tight budgets.",
    summary: "Bright Data MCP connects AI agents to Bright Data's Scraping Browser with automated unblocking.",
    features: ["72M+ Proxies", "Native Unlocking", "Official MCP", "Enterprise SLA"]
  },

  // 21-32
  {
    slug: "zenrows-mcp",
    demo_rank: 21,
    name: "ZenRows MCP Server",
    tagline: "Official Model Context Protocol server delivering automated anti-bot bypass and scraping browser tools for AI agents.",
    website_url: "https://www.zenrows.com/mcp",
    affiliate_url: "https://www.zenrows.com",
    github_url: "https://github.com/zenrows/mcp-server",
    status_badge: "Anti-Bot Specialist",
    overall_score: 9.2,
    provider_slug: "zenrows-browser",
    install_command: "npx -y @zenrows/mcp-server",
    config_snippet: JSON.stringify({
      mcpServers: {
        "zenrows": {
          command: "npx",
          args: ["-y", "@zenrows/mcp-server"],
          env: { "ZENROWS_API_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["zenrows_scrape", "zenrows_browser_session", "zenrows_extract"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Automatic CAPTCHA bypass included",
    stealth_bypass: "Built-in anti-bot bypass in 190+ countries",
    pricing_tier: "Free server; usage covered by ZenRows credits",
    pros: [{ text: "High success rate against Cloudflare Turnstile and DataDome" }, { text: "Predictable credit-based pricing" }],
    cons: [{ text: "Session inactivity timeouts" }],
    verdict: "ZenRows MCP server is among the most reliable and affordable anti-bot browser tools available.",
    ideal_use_case: "AI agents that encounter Cloudflare Turnstile or DataDome challenges.",
    avoid_if: "Multi-day persistent browser profiles.",
    summary: "ZenRows MCP provides AI agents with automated anti-bot bypass and managed scraping browsers.",
    features: ["Turnstile Bypass", "DataDome Evasion", "Credit Pricing", "Claude Desktop"]
  },
  {
    slug: "skyvern-mcp",
    demo_rank: 22,
    name: "Skyvern MCP Server",
    tagline: "Vision-based Model Context Protocol server enabling AI agents to automate complex web workflows without fragile selectors.",
    website_url: "https://www.skyvern.com/developers",
    affiliate_url: "https://www.skyvern.com",
    github_url: "https://github.com/skyvern-ai/skyvern",
    status_badge: "Vision AI Native",
    overall_score: 9.1,
    provider_slug: "skyvern",
    install_command: "npx -y @skyvern/mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "skyvern": {
          command: "npx",
          args: ["-y", "@skyvern/mcp"],
          env: { "SKYVERN_API_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["skyvern_run_task", "skyvern_extract_schema", "skyvern_click"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Vision-guided solving and external bridges",
    stealth_bypass: "Vision-guided natural human interaction",
    pricing_tier: "Open-source core; cloud credits for hosted execution",
    pros: [{ text: "Doesn't break when website DOM class names change" }, { text: "Open-source core with commercial cloud" }],
    cons: [{ text: "Vision processing adds latency per step" }],
    verdict: "Skyvern MCP is unmatched for navigating chaotic, dynamic, or obfuscated single-page applications.",
    ideal_use_case: "Complex multi-step forms and checkouts where DOM selectors mutate constantly.",
    avoid_if: "Ultra-fast raw HTML scraping under 500ms.",
    summary: "Skyvern MCP gives AI agents vision-driven web automation capabilities without fragile XPath selectors.",
    features: ["Vision Navigation", "No Fragile Selectors", "Open Source", "Claude & Cursor"]
  },
  {
    slug: "azure-playwright-mcp",
    demo_rank: 23,
    name: "Azure Playwright Workspaces Remote MCP",
    tagline: "Microsoft Azure's official remote Model Context Protocol workspace for cloud Playwright execution.",
    website_url: "https://learn.microsoft.com/en-us/azure/app-testing/playwright-cloud-browsers/how-to-playwright-workspaces-remote-mcp",
    affiliate_url: "https://learn.microsoft.com/en-us/azure/app-testing/playwright-cloud-browsers/",
    github_url: "https://github.com/microsoft/playwright",
    status_badge: "Microsoft Official",
    overall_score: 9.0,
    provider_slug: "azure-playwright-cloud",
    install_command: "npx -y @azure/playwright-mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "azure-playwright": {
          command: "npx",
          args: ["-y", "@azure/playwright-mcp"],
          env: { "AZURE_PLAYWRIGHT_CONNECTION_STRING": "YOUR_CONN_STRING" }
        }
      }
    }, null, 2),
    tools_provided: ["playwright_run", "playwright_cross_browser", "playwright_trace"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Not provided natively (testing platform)",
    stealth_bypass: "Standard cloud Playwright browsers",
    pricing_tier: "Billed through Microsoft Azure subscription",
    pros: [{ text: "Official Microsoft implementation" }, { text: "Cross-browser testing (Chromium, Firefox, WebKit)" }],
    cons: [{ text: "Not designed for scraping bot-protected targets" }],
    verdict: "The top enterprise MCP server for continuous testing and Playwright CI/CD automation.",
    ideal_use_case: "Enterprise test automation and Playwright spec execution via AI agents.",
    avoid_if: "Scraping bot-protected websites.",
    summary: "Azure Playwright Workspaces Remote MCP connects AI agents to cloud browsers running Playwright across multiple engines.",
    features: ["Microsoft Official", "Chromium/Firefox/WebKit", "CI/CD Integration", "Enterprise Security"]
  },
  {
    slug: "usestring-mcp",
    demo_rank: 24,
    name: "UseString Remote MCP",
    tagline: "Dedicated Remote MCP server connecting AI agents to authenticated browser sessions and web tools.",
    website_url: "https://portal.usestring.ai/docs/mcp/remote",
    affiliate_url: "https://usestring.ai",
    github_url: "",
    status_badge: "Auth & MCP",
    overall_score: 8.7,
    provider_slug: "usestring",
    install_command: "npx -y @usestring/remote-mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "usestring": {
          command: "npx",
          args: ["-y", "@usestring/remote-mcp"],
          env: { "USESTRING_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["us_authenticated_session", "us_navigate", "us_perform_action"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Solver webhooks",
    stealth_bypass: "Encrypted cookie persistence",
    pricing_tier: "Free server; UseString usage",
    pros: [{ text: "Secure handling of authenticated sessions" }, { text: "Dedicated portal documentation" }],
    cons: [{ text: "Focused on agent actions rather than bulk scraping" }],
    verdict: "Excellent MCP server for AI agents executing actions inside authenticated SaaS accounts.",
    ideal_use_case: "Agents automating actions inside user accounts and SaaS dashboards.",
    avoid_if: "Massive anonymous public web scraping.",
    summary: "UseString Remote MCP provides AI agents with secure authenticated cloud browser tools.",
    features: ["Authenticated Sessions", "Remote MCP", "Cookie Encryption", "Claude Ready"]
  },
  {
    slug: "tinyfish-mcp",
    demo_rank: 25,
    name: "TinyFish MCP Integration",
    tagline: "Lightweight, developer-friendly Model Context Protocol integration for Claude and Cursor AI assistants.",
    website_url: "https://docs.tinyfish.ai/mcp-integration",
    affiliate_url: "https://www.tinyfish.ai",
    github_url: "",
    status_badge: "Agile MCP",
    overall_score: 8.7,
    provider_slug: "tinyfish",
    install_command: "npx -y @tinyfish/mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "tinyfish": {
          command: "npx",
          args: ["-y", "@tinyfish/mcp"],
          env: { "TINYFISH_API_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["tinyfish_browse", "tinyfish_click", "tinyfish_extract"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Third-party bridges",
    stealth_bypass: "Automated profile masking",
    pricing_tier: "Free server; pay-as-you-go compute",
    pros: [{ text: "Fast startup and light memory footprint" }, { text: "Simple 2-minute setup for Claude Desktop" }],
    cons: [{ text: "Smaller team infrastructure" }],
    verdict: "A responsive, modern MCP server tailored for lightweight agent browsing.",
    ideal_use_case: "Individual developers adding browser capabilities to Claude Desktop or Cursor.",
    avoid_if: "Strict enterprise SLA requirements.",
    summary: "TinyFish MCP Integration provides lightweight cloud browser tools for AI agents.",
    features: ["Fast Startup", "Low Memory", "Claude Desktop", "Cursor Support"]
  },
  {
    slug: "surfsky-mcp",
    demo_rank: 26,
    name: "SurfSky MCP (PyPI Package)",
    tagline: "Published Python Model Context Protocol package for instant pip installation in AI agent workflows.",
    website_url: "https://pypi.org/project/surfsky-mcp/",
    affiliate_url: "https://surfsky.io",
    github_url: "https://github.com/surfsky-io/surfsky-mcp",
    status_badge: "Python Native",
    overall_score: 8.6,
    provider_slug: "surfsky",
    install_command: "pip install surfsky-mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "surfsky": {
          command: "python",
          args: ["-m", "surfsky_mcp"],
          env: { "SURFSKY_API_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["surfsky_open", "surfsky_navigate", "surfsky_click", "surfsky_close"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "External solver connectors",
    stealth_bypass: "Automated fingerprint emulation",
    pricing_tier: "Free PyPI package; cloud compute usage",
    pros: [{ text: "Published directly on PyPI for easy pip/uv installation" }, { text: "Auto-reconnect WebSocket stability" }],
    cons: [{ text: "Python runtime required (not pure Node npx)" }],
    verdict: "The top pick for Python developers building agentic workflows with LangChain or AutoGen.",
    ideal_use_case: "Python-centric AI agents needing seamless browser tool calling.",
    avoid_if: "Node.js only environments.",
    summary: "SurfSky MCP provides a published Python package for connecting AI agents to cloud browsers.",
    features: ["PyPI Package", "Auto-Reconnect", "Python Ecosystem", "Claude Desktop"]
  },
  {
    slug: "browserview-mcp",
    demo_rank: 27,
    name: "BrowserView MCP Server",
    tagline: "Model Context Protocol server with live WebRTC video streaming of active agent browser sessions.",
    website_url: "https://browserview.io/docs/mcp",
    affiliate_url: "https://browserview.io",
    github_url: "",
    status_badge: "WebRTC Streaming",
    overall_score: 8.8,
    provider_slug: "browserview",
    install_command: "npx -y @browserview/mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "browserview": {
          command: "npx",
          args: ["-y", "@browserview/mcp"],
          env: { "BROWSERVIEW_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["bv_launch", "bv_navigate", "bv_click", "bv_get_stream_url"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Automated solver integrations",
    stealth_bypass: "Dynamic fingerprint emulation",
    pricing_tier: "Free server; cloud session billing",
    pros: [{ text: "Returns a live WebRTC stream URL so users can watch the agent browse" }, { text: "Official MCP documentation" }],
    cons: [{ text: "Streaming video consumes higher bandwidth" }],
    verdict: "BrowserView MCP is exceptional for human-in-the-loop workflows where visual supervision is desired.",
    ideal_use_case: "Observing AI agents execute multi-step web tasks in real time.",
    avoid_if: "Headless pure data harvesting.",
    summary: "BrowserView MCP connects AI agents to cloud browsers with live WebRTC video streaming.",
    features: ["WebRTC Stream", "Live Supervision", "Official MCP", "Claude Desktop"]
  },
  {
    slug: "firecrawl-mcp-server",
    demo_rank: 28,
    name: "Firecrawl MCP Server",
    tagline: "Widely adopted Model Context Protocol server turning websites into clean LLM markdown for Claude and Cursor.",
    website_url: "https://docs.firecrawl.dev/mcp-server",
    affiliate_url: "https://www.firecrawl.dev",
    github_url: "https://github.com/mendableai/firecrawl-mcp-server",
    status_badge: "Markdown Leader",
    overall_score: 9.3,
    provider_slug: "firecrawl-browser",
    install_command: "npx -y firecrawl-mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "firecrawl": {
          command: "npx",
          args: ["-y", "firecrawl-mcp"],
          env: { "FIRECRAWL_API_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["firecrawl_scrape", "firecrawl_crawl", "firecrawl_map", "firecrawl_extract"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Automated solver integrations",
    stealth_bypass: "Built-in smart proxy routing",
    pricing_tier: "Free open-source server; Firecrawl credits",
    pros: [{ text: "World-class conversion of complex websites to clean LLM markdown" }, { text: "Huge community adoption and battle-tested code" }],
    cons: [{ text: "Designed for crawling and scraping rather than clicking interactive form inputs" }],
    verdict: "Firecrawl MCP is the premier tool for feeding fresh web data into Claude and Cursor agent contexts.",
    ideal_use_case: "Extracting documentation, articles, and research pages directly into agent context.",
    avoid_if: "Interactive form fills and button clicks.",
    summary: "Firecrawl MCP server provides web scraping and crawling tools that convert websites to clean Markdown.",
    features: ["Markdown Conversion", "Sitemap Crawling", "Battle Tested", "Cursor & Claude"]
  },
  {
    slug: "axiom-mcp-server",
    demo_rank: 29,
    name: "Axiom.ai Desktop App MCP Server",
    tagline: "Model Context Protocol server bridging Axiom's desktop automation app and cloud browser with Claude.",
    website_url: "https://axiom.ai/docs/developer-hub/mcp/desktop-app-server/",
    affiliate_url: "https://axiom.ai",
    github_url: "",
    status_badge: "Desktop & Cloud",
    overall_score: 8.8,
    provider_slug: "axiom-cdp",
    install_command: "npx -y @axiomhq/mcp-server",
    config_snippet: JSON.stringify({
      mcpServers: {
        "axiom": {
          command: "npx",
          args: ["-y", "@axiomhq/mcp-server"],
          env: { "AXIOM_API_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["axiom_run_automation", "axiom_browser_open", "axiom_scrape"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Integrates with 2Captcha and external solvers",
    stealth_bypass: "Real desktop browser simulation",
    pricing_tier: "Free server; Axiom subscription plan",
    pros: [{ text: "Can trigger existing no-code Axiom bots from Claude" }, { text: "Bridges local desktop and cloud execution" }],
    cons: [{ text: "Requires Axiom subscription" }],
    verdict: "Great for teams that already use Axiom's visual builder and want to trigger bots via AI agent chat.",
    ideal_use_case: "Triggering predefined no-code browser automations via natural language.",
    avoid_if: "Writing raw custom Playwright code.",
    summary: "Axiom MCP server enables AI agents to trigger no-code browser automations and scrape web pages.",
    features: ["No-Code Automation", "Desktop App Bridge", "Claude Desktop", "Visual Builder"]
  },
  {
    slug: "supernatural-mcp",
    demo_rank: 30,
    name: "Supernatural.sh MCP Docs & Server",
    tagline: "Fast and lightweight Model Context Protocol server for high-throughput AI agent web interactions.",
    website_url: "https://supernatural.sh/docs/",
    affiliate_url: "https://supernatural.sh",
    github_url: "",
    status_badge: "High Throughput",
    overall_score: 8.7,
    provider_slug: "supernatural",
    install_command: "npx -y @supernatural/mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "supernatural": {
          command: "npx",
          args: ["-y", "@supernatural/mcp"],
          env: { "SUPERNATURAL_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["sn_browse", "sn_click", "sn_extract", "sn_close"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "External solver hooks",
    stealth_bypass: "Headless evasion techniques",
    pricing_tier: "Free server; PAYG compute",
    pros: [{ text: "Quick startup and clean tool structure" }, { text: "Official MCP documentation" }],
    cons: [{ text: "Smaller developer ecosystem" }],
    verdict: "Supernatural MCP provides clean, fast browser tool calling for autonomous agents.",
    ideal_use_case: "AI agent developers seeking reliable browser tools without enterprise bloat.",
    avoid_if: "Strict enterprise audit compliance.",
    summary: "Supernatural.sh MCP provides cloud browser tools designed for agentic AI setups.",
    features: ["Fast Cold Start", "Official MCP", "Claude Desktop", "Playwright Support"]
  },
  {
    slug: "bf-mktindex-mcp",
    demo_rank: 31,
    name: "BF MktIndex AI Agent MCP",
    tagline: "Market intelligence Model Context Protocol server for automated financial and ecommerce index crawling.",
    website_url: "https://bf.mktindex.com/docs/use-cases/ai-agent",
    affiliate_url: "https://bf.mktindex.com",
    github_url: "",
    status_badge: "Market Indexing",
    overall_score: 8.6,
    provider_slug: "bf-mktindex",
    install_command: "npx -y @mktindex/mcp",
    config_snippet: JSON.stringify({
      mcpServers: {
        "mktindex": {
          command: "npx",
          args: ["-y", "@mktindex/mcp"],
          env: { "MKTINDEX_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["mkt_index_query", "mkt_crawl_page", "mkt_parse_pricing"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "External solver connectors",
    stealth_bypass: "Financial platform evasion",
    pricing_tier: "Free server; market index API billing",
    pros: [{ text: "Pre-built tools for extracting financial and market data" }, { text: "Documented agent use cases" }],
    cons: [{ text: "Specialized for market data rather than general-purpose browsing" }],
    verdict: "Tailor-made for agents monitoring pricing, financial indexes, and competitive ecommerce trends.",
    ideal_use_case: "Financial analysis and competitive price monitoring agents.",
    avoid_if: "General-purpose web browsing.",
    summary: "BF MktIndex MCP provides specialized browser and extraction tools for market data intelligence.",
    features: ["Market Data", "Pricing Extraction", "Official MCP", "High Throughput"]
  },
  {
    slug: "fastbrowse-mcp",
    demo_rank: 32,
    name: "FastBrowse.ai MCP Server",
    tagline: "Low-latency Model Context Protocol server delivering rapid cloud browser execution for AI assistants.",
    website_url: "https://www.fastbrowse.ai/docs/mcp/",
    affiliate_url: "https://www.fastbrowse.ai",
    github_url: "https://github.com/fastbrowse/mcp-server",
    status_badge: "Low Latency",
    overall_score: 8.8,
    provider_slug: "fastbrowse",
    install_command: "npx -y @fastbrowse/mcp-server",
    config_snippet: JSON.stringify({
      mcpServers: {
        "fastbrowse": {
          command: "npx",
          args: ["-y", "@fastbrowse/mcp-server"],
          env: { "FASTBROWSE_API_KEY": "YOUR_KEY" }
        }
      }
    }, null, 2),
    tools_provided: ["fb_goto", "fb_click", "fb_type", "fb_screenshot", "fb_html"],
    supports_claude_desktop: true,
    supports_cursor: true,
    supports_custom_agents: true,
    captcha_solving: "Automated captcha solving hooks",
    stealth_bypass: "Hardware abstraction and stealth spoofing",
    pricing_tier: "Free open-source server; FastBrowse compute usage",
    pros: [{ text: "Sub-second action response times" }, { text: "Official GitHub repository with Claude Desktop guides" }],
    cons: [{ text: "New platform with growing feature set" }],
    verdict: "FastBrowse MCP is a swift, modern browser tool that minimizes agent latency during interactive sessions.",
    ideal_use_case: "Interactive agent chats in Cursor or Claude Desktop where speed is paramount.",
    avoid_if: "Legacy enterprise architectures.",
    summary: "FastBrowse MCP provides low-latency cloud browser tools for AI agents.",
    features: ["Low Latency", "Official GitHub Repo", "Claude Desktop", "Cursor Ready"]
  }
];

// Write out modular data file
const scriptsDir = path.join(__dirname);
fs.writeFileSync(path.join(scriptsDir, 'data-mcp.mjs'), `// Data module for 32 Browser MCP tools
export const BROWSER_MCP_TOOLS = ${JSON.stringify(MCP_TOOLS, null, 2)};
`);

console.log(`Successfully generated data-mcp.mjs with ${MCP_TOOLS.length} Browser MCP tools.`);
