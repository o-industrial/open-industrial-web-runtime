import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { EverythingAsCodeOIWorkspace } from '@o-industrial/common/eac';
import { EaCUserRecord } from '@fathym/eac';
import { OpenIndustrialJWTPayload } from '@o-industrial/common/types';

export type OpenIndustrialWebState = {
  OIClient: OpenIndustrialAPIClient;

  OIKV: Deno.Kv;

  OIJWT: string;

  UserWorkspaces: EaCUserRecord[];

  Workspace: EverythingAsCodeOIWorkspace;
} & OpenIndustrialJWTPayload;
