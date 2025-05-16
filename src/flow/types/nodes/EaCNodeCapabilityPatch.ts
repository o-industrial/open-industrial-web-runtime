/**
 * Patch input used when building a node update.
 */

import { EaCVertexDetails } from '@fathym/eac';
import { EaCFlowNodeMetadata } from '@o-industrial/common/eac';

export type EaCNodeCapabilityPatch<
  TDetails extends EaCVertexDetails = EaCVertexDetails
> = {
  Details?: TDetails;
  Metadata?: EaCFlowNodeMetadata;
};
