import puppeteer, { Browser, LaunchOptions } from 'npm:puppeteer@23.4.1';
import {
  Browser as ChromeBrowser,
  ChromeReleaseChannel,
  detectBrowserPlatform,
  getInstalledBrowsers,
  install,
  resolveBuildId,
} from 'npm:@puppeteer/browsers@2.4.0';
import os from 'node:os';
import path from 'node:path';

export interface ChromeInstance {
  executablePath: string;
  buildId: string;
}

const defaultArgs = ['--no-sandbox', '--disable-setuid-sandbox'];
let chromePromise: Promise<ChromeInstance> | undefined;

async function installChrome(): Promise<ChromeInstance> {
  const platform = await detectBrowserPlatform();
  if (!platform) {
    throw new Error('Unsupported platform for Puppeteer tests.');
  }

  const cacheDir = Deno.env.get('PUPPETEER_CACHE_DIR') ??
    path.join(os.homedir(), '.cache', 'puppeteer');
  await Deno.mkdir(cacheDir, { recursive: true });

  const channelInput = Deno.env.get('QA_CHROME_CHANNEL')?.toLowerCase();
  const channel = Object.values(ChromeReleaseChannel).includes(channelInput as ChromeReleaseChannel)
    ? channelInput as ChromeReleaseChannel
    : ChromeReleaseChannel.STABLE;

  let buildId = Deno.env.get('QA_CHROME_BUILD');
  if (!buildId) {
    buildId = await resolveBuildId(ChromeBrowser.CHROME, platform, channel);
  }

  const installed = await getInstalledBrowsers({ cacheDir });
  const existing = installed.find((candidate) =>
    candidate.browser === ChromeBrowser.CHROME &&
    candidate.buildId === buildId &&
    candidate.platform === platform
  );

  if (existing) {
    return { executablePath: existing.executablePath, buildId };
  }

  const result = await install({
    cacheDir,
    browser: ChromeBrowser.CHROME,
    buildId,
    buildIdAlias: channel,
    platform,
  });

  return { executablePath: result.executablePath, buildId };
}

export async function ensureChrome(): Promise<ChromeInstance> {
  chromePromise ??= installChrome();
  return await chromePromise;
}

export async function launchBrowser(options: LaunchOptions = {}): Promise<Browser> {
  const chrome = await ensureChrome();
  const args = (options as { args?: string[] }).args ?? defaultArgs;

  return await puppeteer.launch({
    headless: true,
    executablePath: chrome.executablePath,
    args,
    ...options,
  });
}

export { puppeteer };
export const defaultLaunchArgs = defaultArgs;
