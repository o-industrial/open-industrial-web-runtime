import { EverythingAsCode } from '@fathym/eac';
import {
  EaCRuntimeConfig,
  EaCRuntimePluginConfig,
} from '@fathym/eac/runtime/config';
import { EaCRuntimePlugin } from '@fathym/eac/runtime/plugins';

import * as djwt from 'jsr:@zaubrik/djwt@3.0.2';
import { loadEaCStewardSvc } from '@fathym/eac/steward/clients';
import { IoCContainer } from '@fathym/ioc';
import { EaCStripeProcessor } from '@fathym/eac-applications/processors';
import { loadEaCLicensingSvc } from '@fathym/eac-licensing/clients';

export default class OpenIndustrialLicensingPlugin implements EaCRuntimePlugin {
  constructor() {}

  public Setup(_config: EaCRuntimeConfig): Promise<EaCRuntimePluginConfig> {
    const pluginConfig: EaCRuntimePluginConfig = {
      Name: OpenIndustrialLicensingPlugin.name,
      EaC: {
        Applications: {
          licensingApi: {
            Details: {
              Name: 'Open Industrial Licensing API',
              Description: 'The licensing API for Open Industrial.',
            },
            ModifierResolvers: {},
            Processor: {
              Type: 'Stripe',
              DatabaseLookup: 'oi',
              LicenseLookup: 'o-industrial',
              HandleSubscription: async (
                entLookup,
                username,
                licLookup,
                planLookup,
                priceLookup
              ) => {
                const licSvc = await loadEaCLicensingSvc();

                const licSubRes = await licSvc.License.Subscription(
                  entLookup,
                  username,
                  licLookup,
                  planLookup,
                  priceLookup
                );

                return licSubRes;
              },
            } as EaCStripeProcessor,
          },
        },
        Licenses: {
          'o-industrial': {
            DatabaseLookup: 'oi',
            Details: {
              Name: 'OpenIndustrial',
              Description: 'The main access license for OpenIndustrial',
              Enabled: true,
              PublishableKey: Deno.env.get('STRIPE_PUBLISHABLE_KEY')!,
              SecretKey: Deno.env.get('STRIPE_SECRET_KEY')!,
              WebhookSecret: Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
            },
            Plans: {
              standard: {
                Details: {
                  Name: 'Standard',
                  Description: 'Get started in our shared cloud',
                  Featured: 'Popular',
                  Features: [
                    'Shared Azure Cloud Hosting',
                    '1 Enterprise Workspace',
                    'Unlimited Schemas & Agents',
                  ],
                  Priority: 300,
                },
                Prices: {
                  monthly: {
                    Details: {
                      Name: 'Monthly',
                      Currency: 'USD',
                      Discount: 0,
                      Interval: 'month',
                      Value: 99.99,
                    },
                  },
                  yearly: {
                    Details: {
                      Name: 'Yearly',
                      Currency: 'USD',
                      Discount: 15,
                      Interval: 'year',
                      Value: 999.99,
                    },
                  },
                },
              },

              pro: {
                Details: {
                  Name: 'Pro',
                  Description: 'Scale with a managed private runtime',
                  Featured: '',
                  Features: [
                    'Managed Azure Cloud Runtime',
                    'Unlimited Workspaces',
                    'Dedicated Surface Isolation',
                    'Priority Support',
                  ],
                  Priority: 200,
                },
                Prices: {
                  monthly: {
                    Details: {
                      Name: 'Monthly',
                      Currency: 'USD',
                      Discount: 0,
                      Interval: 'month',
                      Value: 249.99,
                    },
                  },
                  yearly: {
                    Details: {
                      Name: 'Yearly',
                      Currency: 'USD',
                      Discount: 20,
                      Interval: 'year',
                      Value: 2499.99,
                    },
                  },
                },
              },

              sovereign: {
                Details: {
                  Name: 'Sovereign',
                  Description: 'Bring your own cloud and retain full control',
                  Featured: 'Enterprise',
                  Features: [
                    'Self-Hosted Azure Deployment',
                    'Unlimited Workspaces',
                    'Runtime Access & System CLI',
                    'Federated Memory & Governance Support',
                    'Priority Engineering Access',
                    '* + Annual Enterprise License',
                  ],
                  Priority: 100,
                },
                Prices: {
                  monthly: {
                    Details: {
                      Name: 'Monthly',
                      Currency: 'USD',
                      Discount: 0,
                      Interval: 'month',
                      Value: 499.99,
                    },
                  },
                  yearly: {
                    Details: {
                      Name: 'Annual License',
                      Currency: 'USD',
                      Discount: 0,
                      Interval: 'year',
                      Value: 4999.99,
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    return Promise.resolve(pluginConfig);
  }

  public async Build(
    _eac: EverythingAsCode,
    _ioc: IoCContainer,
    pluginCfg?: EaCRuntimePluginConfig
  ): Promise<void> {
    const eacApiKey = Deno.env.get('EAC_API_KEY');

    if (eacApiKey && pluginCfg) {
      try {
        const [_header, payload] = await djwt.decode(eacApiKey);

        const { EnterpriseLookup } = payload as Record<string, string>;

        const eacSvc = await loadEaCStewardSvc(eacApiKey);

        await eacSvc.EaC.Commit(
          {
            EnterpriseLookup,
            ...pluginCfg.EaC!,
          },
          600
        );
      } catch (_err) {
        console.error(
          'Unable to update EaC Licensing, falling back to local config.'
        );
      }
    }
  }
}
