import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { EverythingAsCodeOIWorkspace } from '@o-industrial/common/eac';
import { EaCUserRecord } from '@fathym/eac';

export type OpenIndustrialWebState = {
  OIClient: OpenIndustrialAPIClient;

  OIKV: Deno.Kv;

  OIJWT: string;

  Username: string;

  UserWorkspaces: EaCUserRecord[];

  Workspace: EverythingAsCodeOIWorkspace;

  WorkspaceLookup: string;
};
