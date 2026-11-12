import fs from "node:fs";
import path from "node:path";
import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";

const siteUrl = process.env.SITE_URL || "https://browser-review.com";
const rawDbUrl = process.env.DATABASE_URL || "file:./data.db";
const dbUrl = rawDbUrl.startsWith("file:") ? rawDbUrl : `file:${rawDbUrl}`;
const uploadsDir = process.env.UPLOADS_DIR || "./uploads";

// Ensure parent directories exist for SQLite database and uploads storage
try {
	const dbFilePath = dbUrl.slice(5);
	const dbDir = path.dirname(path.resolve(dbFilePath));
	if (!fs.existsSync(dbDir)) {
		fs.mkdirSync(dbDir, { recursive: true });
	}
	const resolvedUploadsDir = path.resolve(uploadsDir);
	if (!fs.existsSync(resolvedUploadsDir)) {
		fs.mkdirSync(resolvedUploadsDir, { recursive: true });
	}
} catch {
	// Silently ignore if permissions prevent creation or handled externally
}

export default defineConfig({
	site: siteUrl,
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			...(siteUrl ? { siteUrl } : {}),
			database: sqlite({ url: dbUrl }),
			storage: local({
				directory: uploadsDir,
				baseUrl: "/_emdash/api/media/file",
			}),
		}),
	],
	vite: {
		ssr: {
			noExternal: ["entities"],
		},
	},
	devToolbar: { enabled: false },
});
