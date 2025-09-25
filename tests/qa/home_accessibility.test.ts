import axe, {
  type AxeResults,
  type NodeResult,
  type Result as AxeRuleResult,
} from 'npm:axe-core@4.9.1';
import { launchBrowser } from './utils/browser.ts';

const baseUrl = Deno.env.get('QA_BASE_URL');
const targetUrl = baseUrl?.trim().length ? baseUrl : undefined;

const sanitizeOptions = {
  sanitizeOps: false,
  sanitizeResources: false,
};

type AxeEvaluationResult = Pick<AxeResults, 'violations'>;

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
    const rawResults = await page.evaluate(() => {
      // @ts-ignore axe injected globally by addScriptTag above
      return globalThis.axe.run(document, {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa'],
        },
      });
    });

    const results = rawResults as AxeEvaluationResult;

    if (results.violations.length > 0) {
      const summary = results.violations.map((violation: AxeRuleResult) => {
        const impact = violation.impact ?? 'unknown';
        const nodes = (violation.nodes ?? []) as NodeResult[];
        const targets = nodes
          .slice(0, 3)
          .map((node) => node.target?.join(' > '))
          .filter((target): target is string => Boolean(target))
          .join('; ');

        return `- [${impact}] ${violation.id}: ${violation.help}${targets ? ` (${targets})` : ''}`;
      }).join('\n');

      throw new Error(`Axe found ${results.violations.length} violations:\n${summary}`);
    }
  } finally {
    await browser.close();
  }
});
