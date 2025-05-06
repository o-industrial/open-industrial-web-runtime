import { EaCModuleActuators } from '@fathym/eac';

export const loadEaCActuators: () => EaCModuleActuators = () => {
  const _base = Deno.env.get('EaCStewardAPIs_URL');

  return {
    $Force: true,
    // GitHubApps: {
    //   APIPath: new URL('./github-apps', base),
    //   Order: 100,
    // },
  } as unknown as EaCModuleActuators;
};
