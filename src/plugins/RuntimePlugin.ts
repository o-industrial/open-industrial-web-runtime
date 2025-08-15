import { EaCAtomicIconsProcessor } from '@fathym/atomic-icons';
import { FathymAtomicIconsPlugin } from '@fathym/atomic-icons/plugin';
import { DefaultMyCoreProcessorHandlerResolver } from './DefaultMyCoreProcessorHandlerResolver.ts';
import { IoCContainer } from '@fathym/ioc';
import { EaCRuntimeConfig, EaCRuntimePluginConfig } from '@fathym/eac/runtime/config';
import { EaCRuntimePlugin } from '@fathym/eac/runtime/plugins';
import { EverythingAsCode } from '@fathym/eac';
import { EverythingAsCodeApplications } from '@fathym/eac-applications';
import {
  EaCDFSProcessor,
  EaCOAuthProcessor,
  EaCPreactAppProcessor,
  EaCRedirectProcessor,
  EaCTailwindProcessor,
} from '@fathym/eac-applications/processors';
import { EaCDenoKVDetails, EverythingAsCodeDenoKV } from '@fathym/eac-deno-kv';
import {
  EaCBaseHREFModifierDetails,
  EaCKeepAliveModifierDetails,
  EaCOAuthModifierDetails,
} from '@fathym/eac-applications/modifiers';
import {
  EaCAzureBlobStorageDistributedFileSystemDetails,
  EaCJSRDistributedFileSystemDetails,
  EaCLocalDistributedFileSystemDetails,
} from '@fathym/eac/dfs';
import { EaCAzureADB2CProviderDetails } from '@fathym/eac-identity';
import OpenIndustrialLicensingPlugin from './OpenIndustrialLicensingPlugin.ts';

export default class RuntimePlugin implements EaCRuntimePlugin {
  constructor() {}

  public Setup(config: EaCRuntimeConfig) {
    const pluginConfig: EaCRuntimePluginConfig<
      EverythingAsCode & EverythingAsCodeApplications & EverythingAsCodeDenoKV
    > = {
      Name: RuntimePlugin.name,
      Plugins: [
        new FathymAtomicIconsPlugin(),
        new OpenIndustrialLicensingPlugin(),
      ],
      IoC: new IoCContainer(),
      EaC: {
        Projects: {
          core: {
            Details: {
              Name: 'Golden Path Web Runtime',
              Description: 'The Golden Path Web Runtime to use.',
              Priority: 100,
            },
            ResolverConfigs: {
              localhost: {
                Hostname: 'localhost',
                Port: config.Servers?.[0].port || 8000,
              },
              '127.0.0.1': {
                Hostname: '127.0.0.1',
                Port: config.Servers?.[0].port || 8000,
              },
              'host.docker.internal': {
                Hostname: 'host.docker.internal',
                Port: config.Servers![0].port || 8000,
              },
              'open-industrial.fathym.com': {
                Hostname: 'open-industrial.fathym.com',
              },
              'www.openindustrial.co': {
                Hostname: 'www.openindustrial.co',
              },
              'open-industrial-web-runtime.azurewebsites.net': {
                Hostname: 'open-industrial-web-runtime.azurewebsites.net',
              },
            },
            ModifierResolvers: {
              keepAlive: {
                Priority: 5000,
              },
              oauth: {
                Priority: 10000,
              },
            },
            ApplicationResolvers: {
              automateConference: {
                PathPattern: '/automateconference*',
                Priority: 500,
              },
              assets: {
                PathPattern: '/assets*',
                Priority: 500,
              },
              atomicIcons: {
                PathPattern: '/icons*',
                Priority: 500,
              },
              blog: {
                PathPattern: '/blog*',
                Priority: 500,
              },
              docs: {
                PathPattern: '/docs*',
                Priority: 500,
                IsPrivate: true,
                IsTriggerSignIn: true,
              },
              home: {
                PathPattern: '*',
                Priority: 100,
              },
              home2: {
                PathPattern: '/landing*',
                Priority: 300,
              },
              licensingApi: {
                PathPattern: '/workspace/api/o-industrial/licensing/*',
                Priority: 700,
                IsPrivate: true,
              },
              oauth: {
                PathPattern: '/oauth/*',
                Priority: 500,
              },
              tailwind: {
                PathPattern: '/tailwind*',
                Priority: 500,
              },
              workspace: {
                PathPattern: '/workspace*',
                Priority: 500,
                IsPrivate: true,
                IsTriggerSignIn: true,
              },
            },
          },
        },
        Applications: {
          adb2c: {
            Details: {
              Name: 'ADB2C Page Layouts',
              Description: 'ADB2C Page Layouts.',
            },
            Processor: {
              Type: 'PreactApp',
              AppDFSLookup: 'local:apps/adb2c',
              BypassEaCBase: true,
              ComponentDFSLookups: [['local:apps/adb2c', ['tsx']]],
            } as EaCPreactAppProcessor,
          },
          assets: {
            Details: {
              Name: 'Assets',
              Description: 'The static assets to use.',
            },
            ModifierResolvers: {},
            Processor: {
              Type: 'DFS',
              DFSLookup: 'local:apps/assets',
              CacheControl: {
                'text\\/html': `private, max-age=${60 * 5}`,
                'image\\/': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
                'application\\/javascript': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
                'application\\/typescript': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
                'text\\/css': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
              },
            } as EaCDFSProcessor,
          },
          atomicIcons: {
            Details: {
              Name: 'Atomic Icons',
              Description: 'The atomic icons for the project.',
            },
            ModifierResolvers: {},
            Processor: {
              Type: 'AtomicIcons',
              Config: './configs/atomic-icons.config.json',
            } as EaCAtomicIconsProcessor,
          },
          automateConference: {
            Details: {
              Name: 'Automate Conference Redirect',
            },
            Processor: {
              Type: 'Redirect',
              Redirect: '/',
              Permanent: true,
              PreserveMethod: false,
            } as EaCRedirectProcessor,
          },
          blog: {
            Details: {
              Name: 'Blog',
              Description: 'Blog.',
            },
            ModifierResolvers: {
              baseHref: {
                Priority: 10000,
              },
            },
            Processor: {
              Type: 'PreactApp',
              AppDFSLookup: 'local:apps/blog',
              DocPageConfigPath: './.config.ts',
              ComponentDFSLookups: [
                ['local:apps/components', ['tsx']],
                ['local:apps/blog', ['tsx']],
              ],
            } as EaCPreactAppProcessor,
          },
          docs: {
            Details: {
              Name: 'Documentation Site 2',
              Description: 'Documentation site 2.',
            },
            ModifierResolvers: {
              baseHref: {
                Priority: 10000,
              },
            },
            Processor: {
              Type: 'PreactApp',
              AppDFSLookup: 'local:apps/docs',
              DocPageConfigPath: './.config.ts',
              ComponentDFSLookups: [
                ['local:apps/components', ['tsx']],
                ['local:apps/docs', ['tsx']],
              ],
            } as EaCPreactAppProcessor,
          },
          home2: {
            Details: {
              Name: 'Marketing Plasmic Site',
              Description: 'Marketing Plasmic Home site.',
            },
            ModifierResolvers: {
              baseHref: {
                Priority: 10000,
              },
            },
            Processor: {
              Type: 'DFS',
              DFSLookup: 'abs:public-web',
              CacheControl: {
                'text\\/html': `private, max-age=${60 * 5}`,
                'image\\/': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
                'application\\/javascript': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
                'application\\/typescript': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
                'text\\/css': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
              },
            } as EaCDFSProcessor,
          },
          home: {
            Details: {
              Name: 'Home Site',
              Description: 'Home site.',
            },
            ModifierResolvers: {
              baseHref: {
                Priority: 10000,
              },
            },
            Processor: {
              Type: 'PreactApp',
              AppDFSLookup: 'local:apps/home',
              ComponentDFSLookups: [
                ['local:apps/components', ['tsx']],
                ['local:apps/home', ['tsx']],
              ],
            } as EaCPreactAppProcessor,
          },
          oauth: {
            Details: {
              Name: 'OAuth Site',
              Description: 'The site for use in OAuth workflows for a user',
            },
            Processor: {
              Type: 'OAuth',
              ProviderLookup: 'adb2c',
            } as EaCOAuthProcessor,
          },
          tailwind: {
            Details: {
              Name: 'Tailwind for the Site',
              Description: 'A tailwind config for the site',
            },
            Processor: {
              Type: 'Tailwind',
              DFSLookups: [
                'local:apps/components',
                'local:apps/docs',
                'local:apps/home',
                'local:apps/src',
                // 'local:apps/islands',
                'jsr:@fathym/atomic',
                'jsr:@fathym/atomic-design-kit',
                'jsr:@o-industrial/common',
              ],
              ConfigPath: './tailwind.config.ts',
              StylesTemplatePath: './apps/tailwind/styles.css',
              CacheControl: {
                'text\\/css': `public, max-age=${60 * 60 * 24 * 365}, immutable`,
              },
            } as EaCTailwindProcessor,
          },
          workspace: {
            Details: {
              Name: 'Workspace Site',
              Description: 'Workspace site.',
            },
            ModifierResolvers: {
              baseHref: {
                Priority: 10000,
              },
            },
            Processor: {
              Type: 'PreactApp',
              AppDFSLookup: 'local:apps/workspace',
              ComponentDFSLookups: [
                ['local:apps/components', ['tsx']],
                ['local:apps/workspace', ['tsx']],
                ['jsr:@fathym/atomic', ['tsx']],
                ['jsr:@fathym/atomic-design-kit', ['tsx']],
              ],
            } as EaCPreactAppProcessor,
          },
        },
        DenoKVs: {
          oauth: {
            Details: {
              Type: 'DenoKV',
              Name: 'Local Cache',
              Description: 'The Deno KV database to use for local caching',
              DenoKVPath: Deno.env.get('OAUTH_DENO_KV_PATH') || undefined,
            } as EaCDenoKVDetails,
          },
          oi: {
            Details: {
              Type: 'DenoKV',
              Name: 'OI',
              Description: 'The Deno KV database to use for open industrial web',
              DenoKVPath: Deno.env.get('OPEN_INDUSTRIAL_DENO_KV_PATH') || undefined,
            } as EaCDenoKVDetails,
          },
        },
        DFSs: {
          'abs:public-web': {
            Details: {
              Type: 'AzureBlobStorage',
              Container: 'deployments',
              FileRoot: 'o-industrial/v2-oi-automate-lp/latest',
              DefaultFile: 'index.html',
              ConnectionString: Deno.env.get('AZURE_STORAGE_CONNECTION_STRING'),
            } as EaCAzureBlobStorageDistributedFileSystemDetails,
          },
          'local:apps/adb2c': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/adb2c/',
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/assets': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/assets/',
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/blog': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/blog/',
              DefaultFile: 'index.tsx',
              Extensions: ['tsx'],
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/components': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/components/',
              Extensions: ['tsx'],
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/docs': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/docs/',
              DefaultFile: 'index.mdx',
              Extensions: ['tsx', 'mdx', 'md'],
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/home': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/home/',
              DefaultFile: 'index.tsx',
              Extensions: ['tsx'],
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/src': {
            Details: {
              Type: 'Local',
              FileRoot: './src/',
            } as EaCLocalDistributedFileSystemDetails,
          },
          'local:apps/workspace': {
            Details: {
              Type: 'Local',
              FileRoot: './apps/workspace/',
              DefaultFile: 'index.tsx',
              Extensions: ['tsx'],
            } as EaCLocalDistributedFileSystemDetails,
          },
          // 'local:apps/islands': {
          //   Details: {
          //     Type: 'Local',
          //     FileRoot: './apps/islands/',
          //     Extensions: ['tsx'],
          //   } as EaCLocalDistributedFileSystemDetails,
          // },
          'jsr:@fathym/atomic': {
            Details: {
              Type: 'JSR',
              Package: '@fathym/atomic',
              Version: '',
              WorkerPath: import.meta.resolve('@fathym/eac/dfs/workers/jsr'),
            } as EaCJSRDistributedFileSystemDetails,
          },
          'jsr:@fathym/atomic-design-kit': {
            Details: {
              Type: 'JSR',
              Package: '@fathym/atomic-design-kit',
              Version: '',
              WorkerPath: import.meta.resolve('@fathym/eac/dfs/workers/jsr'),
            } as EaCJSRDistributedFileSystemDetails,
          },
          'jsr:@o-industrial/common': {
            Details: {
              Type: 'JSR',
              Package: '@o-industrial/common',
              Version: '',
              // FileRoot: './atomic',
              Extensions: ['tsx'],
            } as EaCJSRDistributedFileSystemDetails,
            // Details: {
            //   Type: 'Local',
            //   FileRoot: fromFileUrl(
            //     import.meta.resolve(
            //       '../../../open-industrial-reference-architecture/'
            //     )
            //   ),
            //   Extensions: ['tsx'],
            // } as EaCLocalDistributedFileSystemDetails,
          },
        },
        Modifiers: {
          baseHref: {
            Details: {
              Type: 'BaseHREF',
              Name: 'Base HREF',
              Description: 'Adjusts the base HREF of a response based on configureation.',
            } as EaCBaseHREFModifierDetails,
          },
          keepAlive: {
            Details: {
              Type: 'KeepAlive',
              Name: 'Deno KV Cache',
              Description: 'Lightweight cache to use that stores data in a DenoKV database.',
              KeepAlivePath: '/_eac/alive',
            } as EaCKeepAliveModifierDetails,
          },
          oauth: {
            Details: {
              Type: 'OAuth',
              Name: 'OAuth',
              Description: 'Used to restrict user access to various applications.',
              ProviderLookup: 'adb2c',
              SignInPath: '/oauth/signin',
            } as EaCOAuthModifierDetails,
          },
        },
        Providers: {
          adb2c: {
            DatabaseLookup: 'oauth',
            Details: {
              Name: 'Azure ADB2C OAuth Provider',
              Description: 'The provider used to connect with our azure adb2c instance',
              ClientID: Deno.env.get('AZURE_ADB2C_CLIENT_ID')!,
              ClientSecret: Deno.env.get('AZURE_ADB2C_CLIENT_SECRET')!,
              Scopes: ['openid', Deno.env.get('AZURE_ADB2C_CLIENT_ID')!],
              Domain: Deno.env.get('AZURE_ADB2C_DOMAIN')!,
              PolicyName: Deno.env.get('AZURE_ADB2C_POLICY')!,
              TenantID: Deno.env.get('AZURE_ADB2C_TENANT_ID')!,
              IsPrimary: true,
            } as EaCAzureADB2CProviderDetails,
          },
        },
        $GlobalOptions: {
          DFSs: {
            PreventWorkers: true,
          },
        },
      },
    };

    pluginConfig.IoC!.Register(DefaultMyCoreProcessorHandlerResolver, {
      Type: pluginConfig.IoC!.Symbol('ProcessorHandlerResolver'),
    });

    return Promise.resolve(pluginConfig);
  }
}
