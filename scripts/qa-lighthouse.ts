import { dirname, isAbsolute, join } from 'jsr:@std/path@1.0.6';

const baseUrl = Deno.args[0] ?? Deno.env.get('QA_BASE_URL') ?? 'https://www.openindustrial.co/';
const outputPath = Deno.env.get('QA_LIGHTHOUSE_OUTPUT') ?? './tmp/lighthouse-home-report.html';
const outputDir = dirname(outputPath);

await Deno.mkdir(outputDir, { recursive: true });

const chromeFlags = Deno.env.get('QA_LIGHTHOUSE_CHROME_FLAGS') ??
  '--headless --no-sandbox --disable-setuid-sandbox';
const outputFormat = Deno.env.get('QA_LIGHTHOUSE_FORMAT') ?? 'html';
const extraFlags = Deno.env.get('QA_LIGHTHOUSE_FLAGS')
  ?.split(/\s+/)
  .filter((flag) => flag.length > 0) ??
  [];

const command = new Deno.Command(Deno.execPath(), {
  args: [
    'run',
    '-A',
    'npm:lighthouse@11.5.0',
    baseUrl,
    `--output=${outputFormat}`,
    `--output-path=${outputPath}`,
    `--chrome-flags=${chromeFlags}`,
    ...extraFlags,
  ],
  stdin: 'inherit',
  stdout: 'inherit',
  stderr: 'inherit',
});

const child = command.spawn();
const { code, signal } = await child.status;

if (signal !== null) {
  throw new Deno.errors.Interrupted('Lighthouse CLI terminated by signal');
}

if (code !== 0) {
  throw new Error(`Lighthouse CLI exited with code ${code}`);
}

const resolvedOutput = isAbsolute(outputPath) ? outputPath : join(Deno.cwd(), outputPath);
console.log(`Lighthouse report written to ${resolvedOutput}`);
