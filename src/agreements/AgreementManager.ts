import { merge } from '@fathym/common';
import { AgreementData } from '../../apps/islands/organisms/AgreementList.tsx';
import { IoCContainer } from '@fathym/ioc';

export class AgreementManager {
  static Definitions = [
    {
      key: 'terms-of-service',
      title: 'Terms of Service',
      file: 'tos.pdf',
      abstract:
        'These Terms of Service outline your responsibilities, our service guarantees, and the legal framework under which Open Industrial operates. Please review them carefully to understand your rights and obligations when using the platform.',
    },
    {
      key: 'privacy-policy',
      title: 'Privacy Policy',
      file: 'privacy.pdf',
      abstract:
        'This Privacy Policy describes how Open Industrial collects, uses, and protects your personal data. We value your trust and are committed to safeguarding your information responsibly and transparently.',
    },
  ];

  static RootUrl = '/assets/agreements';

  constructor(
    protected ioc: IoCContainer,
    protected oiKvLookup: string = 'oi'
  ) {}

  async LoadAgreements(): Promise<AgreementData[]> {
    const agreementsDir = import.meta.resolve('../../apps/assets/agreements');

    const agreements = await Promise.all(
      AgreementManager.Definitions.map(async (def) => {
        const filePath = `${agreementsDir}/${def.file}`.replace('file:///', '');

        try {
          const stat = await Deno.stat(filePath);
          const version = stat.mtime?.toISOString() ?? new Date().toISOString();

          return {
            key: def.key,
            title: def.title,
            abstract: def.abstract,
            documentLink: `${AgreementManager.RootUrl}/${def.file}`,
            version,
          } as AgreementData;
        } catch {
          console.warn(
            `AgreementManager: Missing or unreadable file: ${def.file}`
          );
          return null;
        }
      })
    );

    return agreements.filter((a): a is AgreementData => Boolean(a));
  }

  async LoadUserAccepted(username: string): Promise<Record<string, string>> {
    const kv = await this.ioc.Resolve(Deno.Kv, this.oiKvLookup);

    const accepted =
      (await kv.get<Record<string, string>>([
        'User',
        username || 'test@fathym.com',
        'Agreements',
      ])) ?? {};

    return accepted.value ?? {};
  }

  async SaveUserAccepted(
    username: string,
    agreedKeys: string[]
  ): Promise<void> {
    const kv = await this.ioc.Resolve(Deno.Kv, this.oiKvLookup);

    const accepted =
      (await kv.get<Record<string, string>>([
        'User',
        username || 'test@fathym.com',
        'Agreements',
      ])) ?? {};

    const currentAccepted = accepted.value ?? {};

    const allDefinitions = await this.LoadAgreements();

    const incomingAccepted = Object.fromEntries(
      agreedKeys
        .map((key) => {
          const def = allDefinitions.find((d) => d.key === key);
          return def ? [key, def.version] : null;
        })
        .filter((entry): entry is [string, string] => entry !== null)
    );

    const merged = merge(currentAccepted, incomingAccepted);

    await kv.set(['User', username || 'test@fathym.com', 'Agreements'], merged);
  }

  AgreementsOutOfDate(
    agreements: AgreementData[],
    userAccepted: Record<string, string>
  ): boolean {
    return agreements.some((agreement) => {
      const acceptedVersion = userAccepted[agreement.key];
      return !acceptedVersion || acceptedVersion < agreement.version;
    });
  }
}
