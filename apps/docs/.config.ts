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
          { Title: 'Promote Your First Schema', Path: '/meet-azi/promote-schema' },
          { Title: 'Deploy Your First Agent', Path: '/meet-azi/deploy-agent' },
        ],
      },
      {
        Title: 'Why Open Industrial',
        Path: '/why-oi',
        Children: [
          { Title: 'Add Reference Data', Path: '/why-oi/reference-data' },
          { Title: 'Promote Composite Schema', Path: '/why-oi/composite-schema' },
          { Title: 'Command the Sim', Path: '/why-oi/command-the-sim' },
          { Title: 'Evolve Your Agent', Path: '/why-oi/evolve-agent' },
        ],
      },
      {
        Title: 'Manifesto',
        Path: '/manifesto',
        Children: [
          { Title: 'Explore Your Workspace', Path: '/manifesto/workspace-explorer' },
          { Title: 'Simulation Journeys', Path: '/manifesto/simulation-journeys' }, // Optional
        ],
      },
      {
        Title: 'Reference Library',
        Path: '/reference',
        Children: [
          { Title: 'Key Concepts Glossary', Path: '/reference/key-concepts' },
          { Title: 'Execution Loop', Path: '/reference/execution-loop' },
          { Title: 'Surfaces', Path: '/reference/surfaces' },
          { Title: 'Forking', Path: '/reference/forking' },
          { Title: 'Virtual Workforce', Path: '/reference/workforce' },
          { Title: 'Workspaces', Path: '/reference/workspaces' },
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
