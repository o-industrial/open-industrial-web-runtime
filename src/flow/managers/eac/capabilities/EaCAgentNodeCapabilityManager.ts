// import { OpenIndustrialEaC } from '@o-industrial/common/types';
// import { NullableArrayOrObject } from '@fathym/common';
// import {
//   EaCNodeCapabilityAsCode,
//   EaCNodeCapabilityContext,
//   EaCNodeCapabilityManager,
//   EaCNodeCapabilityPatch,
// } from './EaCNodeCapabilityManager.ts';
// import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';

// // TODO(mcgear): This one may not be needed any more
// export class EaCAgentNodeCapabilityManager extends EaCNodeCapabilityManager {
//   public Type = 'agent';

//   protected buildAsCode(
//     node: FlowGraphNode,
//     context: EaCNodeCapabilityContext
//   ): EaCNodeCapabilityAsCode | null {
//     const agent = context.GetEaC().Agents?.[node.ID];
//     if (!agent) return null;
//     return {
//       Metadata: agent.Metadata,
//       Details: agent.Details ?? {},
//     };
//   }

//   protected buildUpdatePatch(
//     node: FlowGraphNode,
//     update: EaCNodeCapabilityPatch
//   ): Partial<OpenIndustrialEaC> {
//     return {
//       Agents: {
//         [node.ID]: this.mergeDetailsAndMetadata(
//           update.Details,
//           update.Metadata
//         ),
//       },
//     };
//   }

//   protected buildDeletePatch(
//     node: FlowGraphNode
//   ): NullableArrayOrObject<OpenIndustrialEaC> {
//     return this.wrapDeletePatch('Agents', node.ID);
//   }
// }
