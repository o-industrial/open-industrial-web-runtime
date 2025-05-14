import { jsonMapSetClone, NullableArrayOrObject } from '@fathym/common';
import { EaCVertexDetails } from '@fathym/eac';
import {
  EaCFlowNodeMetadata,
  EaCFlowSettings,
  EaCSchemaAsCode,
  SurfaceSchemaSettings,
} from '@o-industrial/common/eac';
import { GraphStateManager } from '../GraphStateManager.ts';
import { OpenIndustrialEaC } from '../../../types/OpenIndustrialEaC.ts';

/**
 * Central inspector and mutator for EaC-backed node state.
 */
export class EaCNodeInspectorManager {
  constructor(
    protected graph: GraphStateManager,
    protected getEaC: () => OpenIndustrialEaC
  ) {}

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

      return this.buildCompoundUpdatePatch(from, to, parentId, childId, {
        Metadata: update.Metadata,
        Details: update.Details,
      });
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

  public BuildPartialForNodeDelete(
    id: string
  ): NullableArrayOrObject<OpenIndustrialEaC> | null {
    const node = this.graph.GetGraph().Nodes.find((n) => n.ID === id);
    if (!node) return null;

    const typePath = node.Type.toLowerCase();

    if (typePath.includes('->')) {
      const [from, to] = typePath.split('->');
      const [parentId, childId] = id.split('->');
      const outerKey = this.getEaCKeyForType(from);
      const collectionKey = this.getEaCKeyForType(to);

      return {
        [outerKey]: {
          [parentId]: {
            [collectionKey]: {
              [childId]: null,
            },
          },
        },
      };
    }

    const key = this.getEaCKeyForType(node.Type);
    return {
      [key]: { [id]: null },
    };
  }

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
      const childDetails = this.FindAsCode({ ID: childId, Type: to })?.AsCode;
      const childEntry = (parent.AsCode as any)?.[collectionKey]?.[childId];

      const embedded = this.extractAsCode(from, to, childDetails, childEntry);
      return embedded ? { ID: id, Type: typePath, AsCode: embedded } : null;
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

  // ----------------------- Protected Helpers ------------------------

  protected extractEmbeddedAsCode<T extends EaCFlowSettings>(
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

  protected extractSurfaceSchemaOverlay(
    globalSchema: EaCVertexDetails | undefined,
    surfaceSchemaEntry: Record<string, unknown> | undefined
  ): { Metadata?: EaCFlowNodeMetadata; Details: EaCVertexDetails } | null {
    if (!globalSchema || !surfaceSchemaEntry) return null;
    const { Metadata, ...overrides } = surfaceSchemaEntry;
    return {
      Metadata: Metadata as EaCFlowNodeMetadata,
      Details: {
        ...globalSchema,
        ...overrides,
      },
    };
  }

  protected extractAsCode(
    from: string,
    to: string,
    global: { Details: EaCVertexDetails } | null | undefined,
    override: Record<string, any> | undefined
  ): { Metadata?: EaCFlowNodeMetadata; Details: EaCVertexDetails } | null {
    if (!global || !override) return null;
    if (from === 'surface' && to === 'schema') {
      return this.extractSurfaceSchemaOverlay(global.Details, override);
    }
    return this.extractEmbeddedAsCode(global.Details, override);
  }

  protected buildCompoundUpdatePatch(
    from: string,
    to: string,
    parentId: string,
    childId: string,
    update: {
      Metadata?: EaCFlowNodeMetadata;
      Details?: EaCVertexDetails;
    }
  ): Partial<OpenIndustrialEaC> {
    const outerKey = this.getEaCKeyForType(from);

    if (from === 'surface' && to === 'schema') {
      const patch: Partial<OpenIndustrialEaC> = {};

      const { surfaceSettings, schemaDetails } =
        this.splitFlowSettingsForSurfaceSchema({
          ...(update.Details ?? {}),
          ...(update.Metadata ? { Metadata: update.Metadata } : {}),
        });

      if (Object.keys(surfaceSettings).length > 0) {
        patch.Surfaces = {
          [parentId]: {
            Schemas: {
              [childId]: surfaceSettings,
            },
          },
        };
      }

      if (Object.keys(schemaDetails).length > 0) {
        patch.Schemas = {
          [childId]: {
            Details: schemaDetails,
          } as EaCSchemaAsCode,
        };
      }

      return patch;
    }

    const block: Record<string, unknown> = {};
    if (update.Metadata) block.Metadata = update.Metadata;
    if (update.Details) Object.assign(block, update.Details);

    return {
      [outerKey]: {
        [parentId]: {
          [this.getEaCKeyForType(to)]: {
            [childId]: block,
          },
        },
      },
    };
  }

  protected splitFlowSettingsForSurfaceSchema(
    update: EaCVertexDetails & { Metadata?: EaCFlowNodeMetadata }
  ): {
    surfaceSettings: SurfaceSchemaSettings;
    schemaDetails: EaCVertexDetails;
  } {
    const { DisplayMode, Metadata, ...rest } = update;
    return {
      surfaceSettings: {
        ...(Metadata ? { Metadata } : {}),
        ...(DisplayMode ? { DisplayMode } : { DisplayMode: 'table' }),
      } as SurfaceSchemaSettings,
      schemaDetails: rest,
    };
  }

  protected getEaCKeyForType(type: string): keyof OpenIndustrialEaC {
    switch (type.toLowerCase()) {
      case 'agent':
        return 'Agents';
      case 'connection':
        return 'DataConnections';
      case 'schema':
      case 'reference-schema':
      case 'composite-schema':
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
