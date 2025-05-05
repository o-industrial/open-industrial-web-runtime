import { NodeScopeTypes } from '../types/graph/NodeScopeTypes.ts';
import { OpenIndustrialEaC } from '../../types/OpenIndustrialEaC.ts';
import { GraphStateManager } from './GraphStateManager.ts';

export abstract class EaCManager {
  constructor(
    protected scope: NodeScopeTypes,
    protected graph: GraphStateManager
  ) {}

  public abstract LoadFrom(eac: OpenIndustrialEaC): void;

  public abstract ExportTo(): OpenIndustrialEaC;
}

