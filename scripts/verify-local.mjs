// Verification test script for BrowserReviews
import http from 'node:http';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:4330';

const TEST_ROUTES = [
  '/',
  '/browsers',
  '/mcp',
  '/rankings',
  '/calculator',
  '/compare',
  '/reviews/2captcha-browser-api',
  '/reviews/browserbase',
  '/reviews/steel-dev',
  '/reviews/brightdata-scraping-browser',
  '/reviews/browsa',
  '/mcp/2captcha-browser-mcp',
  '/mcp/browserbase-mcp',
  '/mcp/browser-use-mcp',
  '/mcp/fastbrowse-mcp',
  '/compare/2captcha-browser-api-vs-browserbase',
  '/compare/2captcha-browser-mcp-vs-browserbase-mcp',
  '/about',
  '/methodology',
  '/editorial-policy',
  '/affiliate-disclosure',
  '/terms',
  '/sitemap.xml'
];

async function checkRoute(route) {
  const url = `${BASE_URL}${route}`;
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          route,
          status: res.statusCode,
          length: data.length,
          has2Captcha: data.includes('2Captcha'),
          isOk: res.statusCode === 200
        });
      });
    }).on('error', (err) => {
      resolve({
        route,
        status: 'ERROR',
        error: err.message,
        isOk: false
      });
    });
  });
}

async function run() {
  console.log(`Starting local verification against ${BASE_URL}...`);
  let passed = 0;
  let failed = 0;

  for (const route of TEST_ROUTES) {
    const res = await checkRoute(route);
    if (res.isOk) {
      console.log(`✔ [${res.status}] ${res.route} (${res.length} bytes) ${res.has2Captcha ? '• mentions 2Captcha' : ''}`);
      passed++;
    } else {
      console.error(`✖ [${res.status}] ${res.route} - ${res.error || 'Failed'}`);
      failed++;
    }
  }

  console.log(`\nVerification Summary: ${passed} Passed, ${failed} Failed out of ${TEST_ROUTES.length} test routes.`);
  if (failed > 0) process.exit(1);
}

run();
