import axe from 'npm:axe-core@4.9.1';
import { launchBrowser } from './utils/browser.ts';

const baseUrl = Deno.env.get('QA_BASE_URL');
const targetUrl = baseUrl?.trim().length ? baseUrl : undefined;

const sanitizeOptions = {
  sanitizeOps: false,
  sanitizeResources: false,
};

Deno.test({
  name: 'marketing home a11y: axe wcag2a/aa',
  ignore: !targetUrl,
  ...sanitizeOptions,
}, async () => {
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.goto(targetUrl!, { waitUntil: 'networkidle0' });

    await page.addScriptTag({ content: (axe as { source: string }).source });
    const results = await page.evaluate(async () => {
      // @ts-ignore axe injected globally
      return await window.axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa'],
        },
      });
    });

    if (results.violations.length > 0) {
      const summary = results.violations.map((violation: any) => {
        const impact = violation.impact ?? 'unknown';
        const nodes = violation.nodes?.slice(0, 3) ?? [];
        const targets = nodes.map((node: any) => node.target?.join(' > ')).join('; ');
        return `- [${impact}] ${violation.id}: ${violation.help} (${targets})`;
      }).join('\n');

      throw new Error(`Axe found ${results.violations.length} violations:\n${summary}`);
    }
  } finally {
    await browser.close();
  }
});
