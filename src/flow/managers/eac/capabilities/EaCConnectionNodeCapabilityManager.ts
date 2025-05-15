import { NullableArrayOrObject } from '@fathym/common';
import { OpenIndustrialEaC } from '../../../../types/OpenIndustrialEaC.ts';
import { FlowGraphNode } from '../../../types/graph/FlowGraphNode.ts';
import {
  EaCNodeCapabilityManager,
  EaCNodeCapabilityContext,
  EaCNodeCapabilityAsCode,
  EaCNodeCapabilityPatch,
} from './EaCNodeCapabilityManager.ts';

export class EaCConnectionNodeCapabilityManager extends EaCNodeCapabilityManager {
  public Type = 'connection';

  protected buildAsCode(
    node: FlowGraphNode,
    ctx: EaCNodeCapabilityContext
  ): EaCNodeCapabilityAsCode | null {
    const conn = ctx.GetEaC().DataConnections?.[node.ID];
    if (!conn) return null;
    return {
      Metadata: conn.Metadata,
      Details: conn.Details ?? {},
    };
  }

  protected buildUpdatePatch(
    node: FlowGraphNode,
    update: EaCNodeCapabilityPatch
  ): Partial<OpenIndustrialEaC> {
    return {
      DataConnections: {
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
    return this.wrapDeletePatch('DataConnections', node.ID);
  }
}
