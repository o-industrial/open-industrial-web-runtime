import { EaCVertexDetails } from '@fathym/eac';
import { EaCFlowNodeMetadata } from '@o-industrial/common/eac';

/**
 * Return structure for a GetAsCode call.
 */
export type EaCNodeCapabilityAsCode<
  TDetails extends EaCVertexDetails = EaCVertexDetails,
> = {
  Details: TDetails;
  Metadata?: EaCFlowNodeMetadata;
};
