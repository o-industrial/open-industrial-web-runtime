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
        Title: 'Overview',
        Path: '/',
        Children: [
          { Title: 'Why Open Industrial', Path: '/why-oi' },
          { Title: 'Meet Azi', Path: '/meet-azi' },
          { Title: 'Manifesto', Path: '/manifesto' },
        ],
      },
      {
        Title: 'The Execution Model',
        Path: '/execution-model',
        Children: [
          { Title: 'Key Concepts', Path: '/execution-model/key-concepts' },
          { Title: 'Execution Loop', Path: '/execution-model/execution-loop' },
          { Title: 'Schema Promotion', Path: '/execution-model/schema-promotion' },
          { Title: 'Surfaces', Path: '/execution-model/surfaces' },
          { Title: 'Forking', Path: '/execution-model/forking' },
          { Title: 'Workforce', Path: '/execution-model/workforce' },
          { Title: 'Workspaces', Path: '/execution-model/workspaces' },
        ],
      },
      {
        Title: 'Your First Execution',
        Path: '/first-execution',
        Children: [
          { Title: 'Observe First Impulse', Path: '/first-execution/observe-first-impulse' },
          { Title: 'Promote Schema', Path: '/first-execution/promote-schema' },
          { Title: 'Ask a Question', Path: '/first-execution/ask-a-question' },
          { Title: 'Reference Data', Path: '/first-execution/reference-data' },
          { Title: 'Composite Schema', Path: '/first-execution/composite-schema' },
          { Title: 'Command the Sim', Path: '/first-execution/command-the-sim' },
          { Title: 'Teach', Path: '/first-execution/teach' },
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
