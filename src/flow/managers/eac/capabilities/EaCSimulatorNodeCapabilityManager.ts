import { NullableArrayOrObject } from '@fathym/common';
import { OpenIndustrialEaC } from '../../../../types/OpenIndustrialEaC.ts';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';
import { EaCNodeCapabilityManager, EaCNodeCapabilityContext, EaCNodeCapabilityAsCode, EaCNodeCapabilityPatch } from './EaCNodeCapabilityManager.ts';

export class EaCSimulatorNodeCapabilityManager extends EaCNodeCapabilityManager {
  public Type = 'simulator';

  protected buildAsCode(node: FlowGraphNode, ctx: EaCNodeCapabilityContext): EaCNodeCapabilityAsCode | null {
    const sim = ctx.GetEaC().Simulators?.[node.ID];
    if (!sim) return null;
    return {
      Metadata: sim.Metadata,
      Details: sim.Details ?? {},
    };
  }

  protected buildUpdatePatch(node: FlowGraphNode, update: EaCNodeCapabilityPatch): Partial<OpenIndustrialEaC> {
    return {
      Simulators: {
        [node.ID]: this.mergeDetailsAndMetadata(update.Details, update.Metadata),
      },
    };
  }

  protected buildDeletePatch(node: FlowGraphNode): NullableArrayOrObject<OpenIndustrialEaC> {
    return this.wrapDeletePatch('Simulators', node.ID);
  }
}
