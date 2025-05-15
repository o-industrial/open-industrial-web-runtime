import { NullableArrayOrObject } from '@fathym/common';
import { OpenIndustrialEaC } from '../../../../types/OpenIndustrialEaC.ts';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';
import {
  EaCNodeCapabilityManager,
  EaCNodeCapabilityContext,
  EaCNodeCapabilityAsCode,
  EaCNodeCapabilityPatch,
} from './EaCNodeCapabilityManager.ts';

export class EaCSurfaceNodeCapabilityManager extends EaCNodeCapabilityManager {
  public Type = 'surface';

  protected buildAsCode(
    node: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode | null {
    const surf = ctx.GetEaC().Surfaces?.[node.ID];
    if (!surf) return null;
    return {
      Metadata: surf.Metadata,
      Details: surf.Details ?? {},
    };
  }

  protected buildUpdatePatch(
    node: FlowGraphNode,
    update: EaCNodeCapabilityPatch
  ): Partial<OpenIndustrialEaC> {
    return {
      Surfaces: {
        [node.ID]: this.mergeDetailsAndMetadata(
          update.Details,
          update.Metadata
        ),
      },
    };
  }

  protected buildDeletePatch(
    node: FlowGraphNode
  ): NullableArrayOrObject<OpenIndustrialEaC> {
    return this.wrapDeletePatch('Surfaces', node.ID);
  }
}
