// VPS test runner: starts server, runs verification, and exits
import { spawn } from 'node:child_process';
import http from 'node:http';

const port = process.env.PORT || '4335';
console.log(`Starting standalone server on port ${port}...`);

const serverProcess = spawn('/usr/bin/node', ['dist/server/entry.mjs'], {
  env: {
    ...process.env,
    PORT: String(port),
    HOST: '127.0.0.1',
    NODE_ENV: 'production'
  },
  stdio: 'inherit'
});

setTimeout(async () => {
  console.log(`Checking http://127.0.0.1:${port}/ ...`);
  http.get(`http://127.0.0.1:${port}/`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`\n========================================`);
      console.log(`VPS Response Status: ${res.statusCode} (${data.length} bytes)`);
      console.log(`Contains 2Captcha: ${data.includes('2Captcha')}`);
      console.log(`========================================\n`);
      serverProcess.kill('SIGTERM');
      process.exit(res.statusCode === 200 ? 0 : 1);
    });
  }).on('error', (err) => {
    console.error('Connection error:', err.message);
    serverProcess.kill('SIGTERM');
    process.exit(1);
  });
}, 3000);
