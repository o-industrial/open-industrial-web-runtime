import { CurrentEaCState } from '@fathym/eac-applications/steward/api';

export type OpenIndustrialWebState = {
  EnterpriseLookup: string;

  OIJWT: string;

  Username: string;
} & CurrentEaCState;
