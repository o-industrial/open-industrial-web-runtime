import { EaCModuleActuators } from '@fathym/eac';

export const loadEaCActuators: () => EaCModuleActuators = () => {
  const base = Deno.env.get('OPEN_INDUSTRIAL_ACTUATORS_ROOT');

  return {
    $Force: true,
    DataConnections: {
      APIPath: new URL('./actuators/data-connections', base),
      Order: 300,
    },
    // GitHubApps: {
    //   APIPath: new URL('./github-apps', base),
    //   Order: 100,
    // },
  } as unknown as EaCModuleActuators;
};
