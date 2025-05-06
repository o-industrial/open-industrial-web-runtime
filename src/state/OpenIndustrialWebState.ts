import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { OpenIndustrialEaC } from '../types/OpenIndustrialEaC.ts';
import { EaCUserRecord } from '@fathym/eac';

export type OpenIndustrialWebState = {
  OIClient: OpenIndustrialAPIClient;

  OIKV: Deno.Kv;

  OIJWT: string;

  Username: string;

  UserWorkspaces: EaCUserRecord[];

  Workspace: OpenIndustrialEaC;

  WorkspaceLookup: string;
};
