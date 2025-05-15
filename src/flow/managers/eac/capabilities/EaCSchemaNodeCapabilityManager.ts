// import { NullableArrayOrObject } from '@fathym/common';
// import { OpenIndustrialEaC } from '../../../../types/OpenIndustrialEaC.ts';
// import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';
// import {
//   EaCNodeCapabilityContext,
//   EaCNodeCapabilityAsCode,
//   EaCNodeCapabilityPatch,
//   EaCNodeCapabilityManager,
// } from './EaCNodeCapabilityManager.ts';

// //  TODO(mcgear):  This should be implemented to show schemas on the main workspace... schemas created in a surface show up as SchemaDataConnections (A specific type of data connection)...
// export class EaCSchemaNodeCapabilityManager extends EaCNodeCapabilityManager {
//   public Type = 'schema';

//   public override Matches(node: FlowGraphNode): boolean {
//     return ['schema', 'reference-schema', 'composite-schema'].includes(
//       node.Type
//     );
//   }

//   protected buildAsCode(
//     node: FlowGraphNode,
//     ctx: EaCNodeCapabilityContext
//   ): EaCNodeCapabilityAsCode | null {
//     const schema = ctx.GetEaC().Schemas?.[node.ID];
//     if (!schema) return null;
//     return {
//       Metadata: schema.Metadata ?? {},
//       Details: schema.Details ?? {},
//     };
//   }

//   protected buildUpdatePatch(
//     node: FlowGraphNode,
//     update: EaCNodeCapabilityPatch
//   ): Partial<OpenIndustrialEaC> {
//     return {
//       Schemas: {
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
//     return this.wrapDeletePatch('Schemas', node.ID);
//   }
// }
