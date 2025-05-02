import { Position } from '../types/Position.ts';

export type FlowGraphNode = {
  Id: string;
  Type: string;                // e.g. "schema", "agent", "surface"
  Label?: string;
  Position: Position;
  Props: Record<string, unknown>; // Custom fields like SchemaName, AgentRef, etc.
};