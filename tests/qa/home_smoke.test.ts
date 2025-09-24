import { assertStringIncludes } from '@std/assert';
import { launchBrowser } from './utils/browser.ts';

const baseUrl = Deno.env.get('QA_BASE_URL');
const targetUrl = baseUrl?.trim().length ? baseUrl : undefined;

const sanitizeOptions = {
  sanitizeOps: false,
  sanitizeResources: false,
};

Deno.test({
  name: 'marketing home smoke: hero renders',
  ignore: !targetUrl,
  ...sanitizeOptions,
}, async () => {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.goto(targetUrl!, { waitUntil: 'networkidle0' });
    await page.waitForSelector('main h2', { timeout: 10_000 });

    const headline = (await page.$eval('main h2', (el) => el.textContent?.trim() ?? ''))
      .toLowerCase();
    assertStringIncludes(headline, 'ask anything');

    const ctaLabel = (await page.$eval(
      'a[href*="workspace"], button[href*="workspace"]',
      (el) => el.textContent?.trim() ?? '',
    )).toLowerCase();
    assertStringIncludes(ctaLabel, 'get started');
  } finally {
    await browser.close();
  }
});

Deno.test({
  name: 'marketing home smoke: ready cta link resolves',
  ignore: !targetUrl,
  ...sanitizeOptions,
}, async () => {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.goto(targetUrl!, { waitUntil: 'networkidle0' });

    const workspaceLinks = await page.$$('a[href*="workspace"]');
    const targetLink = workspaceLinks.at(-1);
    if (!targetLink) {
      throw new Error('Workspace CTA not found on marketing home.');
    }

    const href = await targetLink.evaluate((el) => el.getAttribute('href') ?? '');
    if (!href) {
      throw new Error('Workspace CTA is missing an href attribute.');
    }

    const resolvedUrl = new URL(href, targetUrl!).toString();
    assertStringIncludes(resolvedUrl.toLowerCase(), 'workspace');

    const response = await fetch(resolvedUrl, { method: 'HEAD', redirect: 'follow' });
    const isAuthRedirect = response.status === 404 &&
      response.redirected &&
      response.url.includes('auth.openindustrial.co');

    if (response.status >= 400 && !isAuthRedirect) {
      throw new Error(`Workspace CTA returned status ${response.status}`);
    }
  } finally {
    await browser.close();
  }
});
