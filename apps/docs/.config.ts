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
        Path: '/reflex-memory',
        Children: [
          {
            Title: 'Connect the Data Stream',
            Path: '/reflex-memory/data-stream',
          },
          {
            Title: 'See What the Runtime Remembers',
            Path: '/reflex-memory/runtime-memory',
          },
          {
            Title: 'Refine Your Reflexes',
            Path: '/reflex-memory/refine-reflexes',
          },
          {
            Title: 'Teach New Reflex',
            Path: '/reflex-memory/teach-new-reflex',
          },
          {
            Title: 'Recover the Memory',
            Path: '/reflex-memory/recover-runtime',
          },
          {
            Title: 'Decide Where Memory Lives',
            Path: '/reflex-memory/deploy-options',
          },
        ],
      },
      {
        Title: 'Execution Journeys',
        Path: '/journeys',
        Children: [
          {
            Title: 'Pharma Factory Simulation',
            Path: '/journeys/pharma-factory',
            Children: [
              {
                Title: 'Track A – Hybrid OT Integration',
                Path: '/journeys/pharma-factory/hybrid',
                Children: [
                  { Title: 'Introduce the Integration Zone', Path: '/journeys/pharma-factory/hybrid/introduce-zone' },
                  { Title: 'Observe, Join, Confirm', Path: '/journeys/pharma-factory/hybrid/observe-join' },
                  { Title: 'Fork + Run in Shadow', Path: '/journeys/pharma-factory/hybrid/shadow-mode' },
                  { Title: 'Add Shared Reference Memory', Path: '/journeys/pharma-factory/hybrid/shared-memory' },
                  { Title: 'Enable Real-Time Reflex Sync', Path: '/journeys/pharma-factory/hybrid/reflex-sync' },
                  { Title: 'Create Role-Based Views and Queries', Path: '/journeys/pharma-factory/hybrid/team-views' },
                  { Title: 'Validate and Replay Over Legacy', Path: '/journeys/pharma-factory/hybrid/replay-legacy' },
                  { Title: 'Approve and Promote the Memory Pack', Path: '/journeys/pharma-factory/hybrid/promote-pack' },
                  { Title: 'Ship It with Azi', Path: '/journeys/pharma-factory/hybrid/deploy-runtime' },
                ],
              },
              {
                Title: 'Track B – Full System Replacement',
                Path: '/journeys/pharma-factory/full',
                Children: [
                  { Title: 'Start from Memory, Not Code', Path: '/journeys/pharma-factory/full/start-from-memory' },
                  { Title: 'Assemble the Execution Lattice', Path: '/journeys/pharma-factory/full/assemble-lattice' },
                  { Title: 'Author Reflex Agents', Path: '/journeys/pharma-factory/full/reflex-agents' },
                  { Title: 'Connect Devices via Protocol Streams', Path: '/journeys/pharma-factory/full/device-streams' },
                  { Title: 'Deploy to Real Surfaces', Path: '/journeys/pharma-factory/full/deploy-surfaces' },
                  { Title: 'Empower the Team', Path: '/journeys/pharma-factory/full/team-dashboards' },
                  { Title: 'Audit via Replay + Impulse Diffing', Path: '/journeys/pharma-factory/full/audit-replay' },
                  { Title: 'Secure the Runtime with Contracts', Path: '/journeys/pharma-factory/full/runtime-contracts' },
                  { Title: 'Federate and Operate as a Team', Path: '/journeys/pharma-factory/full/federate-runtime' },
                ],
              },
            ],
          },
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
    ],
    MDX: {
      RemarkPlugins: [],
      RehypePlugins: [],
    },
  });
}

export default loadDocsConfig;
