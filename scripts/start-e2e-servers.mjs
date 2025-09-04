// Starts API and Web dev servers for Playwright E2E and waits until reachable.
import { spawn, spawnSync } from 'node:child_process';
import http from 'node:http';

function waitForHttp(url, timeoutMs = 120000, intervalMs = 1000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on('error', () => {
        if (Date.now() - start > timeoutMs) return reject(new Error(`Timeout waiting for ${url}`));
        setTimeout(tick, intervalMs);
      });
    };
    tick();
  });
}

function resolveDeno() {
  if (process.env.DENO_PATH) return process.env.DENO_PATH;
  try {
    const cmd = process.platform === 'win32' ? 'where' : 'which';
    const res = spawnSync(cmd, ['deno'], { encoding: 'utf8' });
    if (res.status === 0) {
      const line = res.stdout.split(/\r?\n/).find(Boolean);
      if (line) return line.trim();
    }
  } catch {}
  return 'deno';
}

function spawnDenoTask(cwd, task) {
  const denoCmd = resolveDeno();
  const child = spawn(`${denoCmd} task ${task}`, {
    cwd,
    stdio: 'inherit',
    env: process.env,
    shell: true,
  });
  child.on('exit', (code) => {
    if (code !== 0) process.exit(code ?? 1);
  });
  return child;
}

const repoRoot = new URL('../../', import.meta.url).pathname;
const apiDir = new URL('../../open-industrial-api-runtime/', import.meta.url).pathname;
const webDir = new URL('../', import.meta.url).pathname;

// Ensure the web runtime can find the local API root
process.env.OPEN_INDUSTRIAL_API_ROOT = process.env.OPEN_INDUSTRIAL_API_ROOT || 'http://localhost:5412';

const api = spawnDenoTask(apiDir, 'dev');
const web = spawnDenoTask(webDir, 'dev');

const shutdown = () => {
  api.kill('SIGTERM');
  web.kill('SIGTERM');
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

await Promise.all([
  waitForHttp('http://localhost:5412').catch(() => {}),
  waitForHttp('http://localhost:5411'),
]);

// Keep process alive; Playwright will manage lifecycle.
setInterval(() => {}, 1 << 30);
