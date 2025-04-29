import { merge } from '@fathym/common';
import { AgreementData } from '../../apps/islands/organisms/AgreementList.tsx';
import { IoCContainer } from '@fathym/ioc';
import { saveWithRetry } from '../utils/saveWithRetry.ts';

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

  /**
   * Loads the system's defined agreements and computes their version from filesystem metadata.
   * @returns A Promise resolving to an array of AgreementData.
   */
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
          console.warn(`AgreementManager: Missing or unreadable file: ${def.file}`);
          return null;
        }
      })
    );

    return agreements.filter((a): a is AgreementData => Boolean(a));
  }

  /**
   * Loads the agreements a user has accepted from DenoKV.
   * @param username The user's username.
   * @returns A Promise resolving to a mapping of agreement keys to version strings.
   * @throws Error if the username is not provided.
   */
  async LoadUserAccepted(username: string): Promise<Record<string, string>> {
    if (!username) {
      throw new Error('LoadUserAccepted: Username is required.');
    }

    const kv = await this.ioc.Resolve(Deno.Kv, this.oiKvLookup);

    const key = ['User', username, 'Agreements'];

    const accepted = await kv.get<Record<string, string>>(key);

    return accepted?.value ?? {};
  }

  /**
   * Saves the user's newly accepted agreements, merging safely with existing accepted agreements.
   * Uses optimistic concurrency and retries once on conflict.
   * 
   * @param username The user's username.
   * @param agreedKeys Array of agreement keys the user is accepting.
   * @throws Error if username is missing or concurrency issues persist.
   */
  async SaveUserAccepted(username: string, agreedKeys: string[]): Promise<void> {
    if (!username) {
      throw new Error('SaveUserAccepted: Username is required.');
    }

    await saveWithRetry(async () => {
      const kv = await this.ioc.Resolve(Deno.Kv, this.oiKvLookup);
      const key = ['User', username, 'Agreements'];

      const currentEntry = await kv.get<Record<string, string>>(key);
      const currentAccepted = currentEntry?.value ?? {};

      const allDefinitions = await this.LoadAgreements();

      const incomingAccepted = Object.fromEntries(
        agreedKeys
          .map((k) => {
            const def = allDefinitions.find((d) => d.key === k);
            return def ? [k, def.version] : null;
          })
          .filter((e): e is [string, string] => e !== null)
      );

      const merged = merge(currentAccepted, incomingAccepted);

      const res = await kv.atomic()
        .check(currentEntry)
        .set(key, merged)
        .commit();

      if (!res.ok) {
        throw new Error('SaveUserAccepted: Concurrent update detected, please retry.');
      }
    });
  }

  /**
   * Checks whether any of the current system agreements are out-of-date compared to the user's accepted agreements.
   * 
   * @param agreements Array of system AgreementData objects.
   * @param userAccepted Record of agreement keys and versions the user has accepted.
   * @returns True if any agreement is missing or outdated, otherwise false.
   */
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
