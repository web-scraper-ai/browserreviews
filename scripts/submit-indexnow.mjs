import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const HOST = 'browser-review.com';
const KEY = 'b8c4d5e9f1a24388b7e21a50c3d97f21';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function main() {
  console.log(`[IndexNow] Fetching URLs from ${SITEMAP_URL}...`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
  }

  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].trim());
  console.log(`[IndexNow] Discovered ${urls.length} URLs to submit.`);

  // IndexNow API accepts up to 10,000 URLs per request
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  console.log(`[IndexNow] Submitting payload to https://api.indexnow.org/indexnow...`);
  const postRes = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload)
  });

  console.log(`[IndexNow] Response status: ${postRes.status} ${postRes.statusText}`);
  if (postRes.status === 200 || postRes.status === 202) {
    console.log(`[IndexNow] SUCCESS! Search engines notified for ${urls.length} URLs.`);
  } else {
    const errText = await postRes.text();
    console.warn(`[IndexNow] Non-standard response: ${errText}`);
  }
}

main().catch(console.error);
