/**
 * Site URL configuration helper.
 *
 * Uses a single environment variable `SITE_URL` for the public site URL,
 * falling back to `http://localhost:4321` (or request origin) in development.
 */

/**
 * Returns the configured public site origin without a trailing slash.
 * Defaults to `SITE_URL` if set, or `http://localhost:4321` (or request origin) in local development.
 */
export const DEFAULT_SITE_URL = "https://2-proxy.com";

export function getSiteOrigin(requestOrigin?: string): string {
	const envUrl =
		(typeof process !== "undefined" && process.env?.SITE_URL) ||
		(typeof import.meta !== "undefined" && import.meta.env?.SITE_URL);

	if (envUrl && typeof envUrl === "string" && envUrl.trim() !== "") {
		return envUrl.trim().replace(/\/+$/, "");
	}

	const isDev =
		(typeof import.meta !== "undefined" && Boolean(import.meta.env?.DEV)) ||
		(typeof process !== "undefined" && process.env?.NODE_ENV === "development");

	if (isDev) {
		return (requestOrigin || "http://localhost:4321").replace(/\/+$/, "");
	}

	return DEFAULT_SITE_URL;
}

/**
 * Resolves a path or existing URL to an absolute URL on the configured public site origin.
 * External URLs (pointing to third-party domains) are preserved as-is and never rewritten.
 * Internal URLs and relative paths are normalized to the site origin.
 */
export function toSiteUrl(pathOrUrl?: string | null, requestOrigin?: string): string {
	const origin = getSiteOrigin(requestOrigin);
	if (!pathOrUrl) return origin;

	const trimmed = pathOrUrl.trim();
	if (!trimmed) return origin;

	const hasTrailingSlash = trimmed.length > 1 && trimmed.endsWith("/");
	if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
		try {
			const parsed = new URL(trimmed);
			const originHost = new URL(origin).hostname.toLowerCase();
			const urlHost = parsed.hostname.toLowerCase();

			const isInternalHost =
				urlHost === originHost ||
				urlHost === "localhost" ||
				urlHost === "127.0.0.1" ||
				urlHost === "2-proxy.com" ||
				urlHost.endsWith(".2-proxy.com");

			if (!isInternalHost) {
				return trimmed;
			}

			const cleanPath = parsed.pathname === "/" ? "" : parsed.pathname.replace(/\/+$/, "");
			const finalPath = cleanPath && hasTrailingSlash ? `${cleanPath}/` : cleanPath;
			return `${origin}${finalPath}${parsed.search}${parsed.hash}`;
		} catch {
			// If URL parsing fails, treat as relative path below
		}
	}

	const normalizedPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
	if (normalizedPath === "/") return origin;
	const cleanNormalized = normalizedPath.replace(/\/+$/, "");
	return `${origin}${cleanNormalized}${hasTrailingSlash ? "/" : ""}`;
}
