import { DocsConfig } from '@fathym/eac-applications/runtime/processors';

/**
 * Asynchronously loads the documentation configuration.
 * This function allows for dynamic imports and processing if needed.
 */
function loadDocsConfig(): Promise<DocsConfig> {
  return Promise.resolve({
    Title: 'Open Industrial - Documentation',
    Nav: [
      {
        Title: 'Meet Azi',
        Path: '/',
        Children: [
          { Title: 'Spin Up the Sim', Path: '/meet-azi/spin-up-sim' },
          {
            Title: 'Promote Your First Schema',
            Path: '/meet-azi/promote-schema',
          },
          { Title: 'Deploy Your First Agent', Path: '/meet-azi/deploy-agent' },
        ],
      },
      {
        Title: 'Why Open Industrial',
        Path: '/why-oi',
        Children: [
          { Title: 'Reference Data', Path: '/why-oi/reference-data' },
          { Title: 'Composite Schema', Path: '/why-oi/composite-schema' },
          { Title: 'Command the Sim', Path: '/why-oi/command-the-sim' },
          { Title: 'Evolve Together', Path: '/why-oi/evolve-together' },
        ],
      },
      {
        Title: 'Mission-Critical',
        Path: '/mission-critical',
        Children: [
          {
            Title: 'Memory You Can Ship',
            Path: '/mission-critical/memory-you-can-ship',
          },
          {
            Title: 'Forkable Runtime',
            Path: '/mission-critical/forkable-runtime',
          },
          {
            Title: 'From Sim to Site',
            Path: '/mission-critical/from-sim-to-site',
          },
          {
            Title: 'Fire Azi (and Keep Running)',
            Path: '/mission-critical/fire-azi',
          },
          {
            Title: 'Proof of Reflex',
            Path: '/mission-critical/proof-of-reflex',
          },
        ],
      },
      {
        Title: 'Reflex from Memory',
        Path: '/extend-memory',
        Children: [
          {
            Title: 'Connect the Data Stream',
            Path: '/extend-memory/data-stream',
          },
          {
            Title: 'See What the Runtime Remembers',
            Path: '/extend-memory/runtime-memory',
          },
          {
            Title: 'Refine Your Reflexes',
            Path: '/extend-memory/refine-reflexes',
          },
          {
            Title: 'Teach New Reflex',
            Path: '/extend-memory/teach-new-reflex',
          },
          {
            Title: 'Recover the Memory',
            Path: '/extend-memory/recover-runtime',
          },
          {
            Title: 'Decide Where Memory Lives',
            Path: '/extend-memory/deploy-options',
          },
        ],
      },
    ],
    MDX: {
      RemarkPlugins: [],
      RehypePlugins: [],
    },
  });
}

export default loadDocsConfig;
