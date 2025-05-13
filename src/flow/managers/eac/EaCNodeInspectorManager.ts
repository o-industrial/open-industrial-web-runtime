import { jsonMapSetClone, NullableArrayOrObject } from '@fathym/common';
import { EaCVertexDetails } from '@fathym/eac';
import { EaCFlowNodeMetadata, EaCFlowSettings } from '@o-industrial/common/eac';
import { GraphStateManager } from '../GraphStateManager.ts';
import { OpenIndustrialEaC } from '../../../types/OpenIndustrialEaC.ts';

/**
 * Normalize an embedded block (like a surface DataConnection) into { Metadata, Details }
 */
function extractEmbeddedAsCode<T extends EaCFlowSettings>(
  eacBlock: EaCVertexDetails,
  block: T | undefined
): { Metadata?: EaCFlowNodeMetadata; Details: EaCVertexDetails } | null {
  if (!block) return null;

  const { Metadata, ...details } = block;
  return {
    Metadata: Metadata ?? {},
    Details: { ...(details ?? {}), Name: eacBlock.Name },
  };
}

/**
 * Central inspector and mutator for EaC-backed node state.
 */
export class EaCNodeInspectorManager {
  constructor(
    protected graph: GraphStateManager,
    protected getEaC: () => OpenIndustrialEaC
  ) {}

  /**
   * Build a partial update payload for a given node — works for compound types too.
   */
  public BuildPartialForNodeUpdate(
    id: string,
    update: Partial<{
      Metadata: EaCFlowNodeMetadata;
      Details: EaCVertexDetails;
    }>
  ): Partial<OpenIndustrialEaC> | null {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    if (!node) return null;

    const typePath = node.Type.toLowerCase();

    const updateBlock =
      update.Details || update.Metadata
        ? {
            ...(update.Details ?? {}),
            ...(update.Metadata ? { Metadata: update.Metadata } : {}),
          }
        : null;

    if (!updateBlock) return null;

    if (typePath.includes('->')) {
      const [from, to] = typePath.split('->');
      const [parentId, childId] = id.split('->');
      const parent = this.FindAsCode({ ID: parentId, Type: from });
      if (!parent) return null;

      const collectionKey = this.getEaCKeyForType(to);
      const outerKey = this.getEaCKeyForType(from);

      const parentBlock = { ...jsonMapSetClone(parent.AsCode) } as Record<
        string,
        any
      >;

      if (!parentBlock[collectionKey]) parentBlock[collectionKey] = {};
      parentBlock[collectionKey][childId] = updateBlock;

      return {
        [outerKey]: {
          [parentId]: parentBlock,
        },
      };
    }

    const key = this.getEaCKeyForType(node.Type);
    return {
      [key]: {
        [id]: {
          ...(update.Details ? { Details: update.Details } : {}),
          ...(update.Metadata ? { Metadata: update.Metadata } : {}),
        },
      },
    };
  }

  /**
   * Build a delete payload for the specified node, including embedded types.
   */
  public BuildPartialForNodeDelete(
    id: string
  ): NullableArrayOrObject<OpenIndustrialEaC> | null {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    if (!node) return null;

    const typePath = node.Type.toLowerCase();

    if (typePath.includes('->')) {
      const [from, to] = typePath.split('->');
      const [parentId, childId] = id.split('->');
      const parent = this.FindAsCode({ ID: parentId, Type: from });
      if (!parent) return null;

      const collectionKey = this.getEaCKeyForType(to);
      const outerKey = this.getEaCKeyForType(from);

      const parentBlock = { ...jsonMapSetClone(parent.AsCode) } as Record<
        string,
        any
      >;

      if (!parentBlock[collectionKey]) return null;
      parentBlock[collectionKey][childId] = null;

      return {
        [outerKey]: {
          [parentId]: parentBlock,
        },
      };
    }

    const key = this.getEaCKeyForType(node.Type);
    return {
      [key]: { [id]: null },
    } as NullableArrayOrObject<OpenIndustrialEaC>;
  }

  /**
   * Returns a normalized { Metadata, Details } object for a given node.
   */
  public FindAsCode(node: { ID: string; Type: string }): {
    ID: string;
    Type: string;
    AsCode: {
      Metadata?: EaCFlowNodeMetadata;
      Details: EaCVertexDetails;
    };
  } | null {
    const eac = this.getEaC();
    const id = node.ID;
    const typePath = node.Type.toLowerCase();

    if (typePath.includes('->')) {
      const [from, to] = typePath.split('->');
      const [parentId, childId] = id.split('->');

      const parent = this.FindAsCode({ ID: parentId, Type: from });
      if (!parent) return null;

      const collectionKey = this.getEaCKeyForType(to);
      const embedded = extractEmbeddedAsCode(
        this.FindAsCode({ ID: childId, Type: to })?.AsCode.Details!,
        (parent.AsCode as any)?.[collectionKey]?.[childId]
      );

      return embedded
        ? {
            ID: id,
            Type: typePath,
            AsCode: embedded,
          }
        : null;
    }

    const key = this.getEaCKeyForType(typePath);
    const entry = (eac[key] as Record<string, any>)?.[id];
    if (!entry) return null;

    const cloned = jsonMapSetClone(entry);
    cloned.Metadata ??= {};
    cloned.Details ??= {};

    return {
      ID: id,
      Type: typePath,
      AsCode: {
        ...cloned,
        Details: cloned.Details!,
      },
    };
  }

  public GetDetails(id: string): EaCVertexDetails | null {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    return node ? this.FindAsCode(node)?.AsCode.Details ?? null : null;
  }

  public GetMetadata(id: string): EaCFlowNodeMetadata | null {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    return node ? this.FindAsCode(node)?.AsCode.Metadata ?? null : null;
  }

  protected getEaCKeyForType(type: string): keyof OpenIndustrialEaC {
    switch (type.toLowerCase()) {
      case 'agent':
        return 'Agents';
      case 'connection':
        return 'DataConnections';
      case 'schema':
        return 'Schemas';
      case 'simulator':
        return 'Simulators';
      case 'surface':
        return 'Surfaces';
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }
}
