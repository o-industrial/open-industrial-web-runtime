import { OpenIndustrialAPIClient } from '@o-industrial/common/api';
import { EverythingAsCodeOIWorkspace } from '@o-industrial/common/eac';
import { OpenIndustrialJWTPayload } from '@o-industrial/common/types';
import { EaCUserRecord } from '@fathym/eac';
import { EaCUserLicense } from '@fathym/eac-licensing';

export type OpenIndustrialWebState = {
  AzureAccessToken?: () => Promise<string | undefined>;

  OIClient: OpenIndustrialAPIClient;

  OIKV: Deno.Kv;

  OIJWT: string;

  UserLicenses?: Record<string, EaCUserLicense>;

  UserWorkspaces: EaCUserRecord[];

  Workspace: EverythingAsCodeOIWorkspace;
} & OpenIndustrialJWTPayload;
