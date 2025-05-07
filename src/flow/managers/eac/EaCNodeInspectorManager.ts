import { GraphStateManager } from '../GraphStateManager.ts';
import { OpenIndustrialEaC } from '../../../types/OpenIndustrialEaC.ts';
import { EaCVertexDetails } from '@fathym/eac';
import { EaCFlowNodeMetadata } from '@o-industrial/common/eac';
import { jsonMapSetClone } from '@fathym/common';

/**
 * EaCNodeInspectorManager provides readonly runtime access to node-level metadata and details
 * directly from the canonical Everything-as-Code (EaC) model.
 *
 * It is designed for inspector panels, settings editors, and reflective tools that
 * must derive current values from the actual EaC system state rather than transient UI.
 */
export class EaCNodeInspectorManager {
  constructor(
    protected graph: GraphStateManager,
    protected getEaC: () => OpenIndustrialEaC,
  ) {}

  /**
   * Get the `.Details` object from the EaC model for a given node ID.
   */
  public GetDetails(id: string): EaCVertexDetails | null {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    if (!node) return null;

    return this.FindAsCode(node)?.AsCode.Details ?? null;
  }

  /**
   * Get the `.Metadata` object from the EaC model for a given node ID.
   */
  public GetMetadata(id: string): EaCFlowNodeMetadata | null {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    if (!node) return null;

    return this.FindAsCode(node)?.AsCode.Metadata ?? null;
  }

  /**
   * Lookup a node in the canonical EaC structure and return a fully cloned, typed result.
   * This enables safe reflection without risk of downstream mutation.
   */
  public FindAsCode(node: { ID: string; Type: string }): {
    ID: string;
    Type: string;
    AsCode: {
      Metadata?: EaCFlowNodeMetadata;
      Details: EaCVertexDetails;
    };
  } | null {
    const id = node.ID;
    const eac = this.getEaC();

    let entry:
      | { Metadata?: EaCFlowNodeMetadata; Details?: EaCVertexDetails }
      | undefined;

    switch (node.Type) {
      case 'agent':
        entry = eac.Agents?.[id];
        break;
      case 'connection':
        entry = eac.DataConnections?.[id];
        break;
      case 'schema':
        entry = eac.Schemas?.[id];
        break;
      case 'simulator':
        entry = eac.Simulators?.[id];
        break;
      case 'surface':
        entry = eac.Surfaces?.[id];
        break;
    }

    if (!entry) return null;

    const clone = jsonMapSetClone(entry);
    clone.Metadata ??= {};
    clone.Details ??= {};

    return {
      ID: id,
      Type: node.Type,
      AsCode: clone as {
        Metadata?: EaCFlowNodeMetadata;
        Details: EaCVertexDetails;
      },
    };
  }
}
