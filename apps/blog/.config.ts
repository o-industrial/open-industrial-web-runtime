import { DocsConfig } from 'jsr:@fathym/eac-applications@0.0.191/runtime/processors';

/**
 * Asynchronously loads the documentation configuration.
 * This function allows for dynamic imports and processing if needed.
 */
function loadDocsConfig(): Promise<DocsConfig> {
  return Promise.resolve({
    Title: 'Open Industrial - Documentation',
    Nav: [
      {
        Title: 'Beyond the Panic',
        Path: '/beyond-the-panic',
      },
    ],
    MDX: {
      RemarkPlugins: [],
      RehypePlugins: [],
    },
  });
}

export default loadDocsConfig;
