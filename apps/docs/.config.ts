import { DocsConfig } from '@fathym/eac-applications/runtime/processors';

/**
 * Asynchronously loads the documentation configuration.
 * This function allows for dynamic imports and processing if needed.
 */
function loadDocsConfig(): Promise<DocsConfig> {
  return Promise.resolve({
    Title: 'AAIDEN - Documentation',
    Nav: [
      {
        Title: 'Overview',
        Path: '/',
        Children: [
          { Title: 'Why AAIDEN?', Path: '/why-aaiden' },
          { Title: 'Manifesto', Path: '/manifesto' },
        ],
      },
      {
        Title: 'Meet Azi',
        Path: '/meet-azi',
        Children: [
          { Title: 'Observe First Impulse', Path: '/meet-azi/observe-first-impulse' },
          { Title: 'Promote Schema', Path: '/meet-azi/promote-schema' },
          { Title: 'Ask a Question', Path: '/meet-azi/ask-a-question' },
          { Title: 'Reference Data', Path: '/meet-azi/reference-data' },
          { Title: 'Composite Schema', Path: '/meet-azi/composite-schema' },
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
