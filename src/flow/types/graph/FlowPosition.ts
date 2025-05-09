import { z } from 'zod';

/**
 * Shared FlowPosition structure for layout tracking.
 */
export type FlowPosition = {
  /** Horizontal canvas position */
  X: number;

  /** Vertical canvas position */
  Y: number;
};

/**
 * Zod schema for FlowPosition.
 */
export const FlowPositionSchema: z.ZodType<FlowPosition> = z
  .object({
    X: z.number().describe('Horizontal canvas position'),
    Y: z.number().describe('Vertical canvas position'),
  })
  .describe('Canvas position tracking for flow-aligned nodes.');

/**
 * Type guard for FlowPosition.
 */
export function isFlowPosition(pos: unknown): pos is FlowPosition {
  return FlowPositionSchema.safeParse(pos).success;
}

/**
 * Parses and validates a FlowPosition object.
 */
export function parseFlowPosition(pos: unknown): FlowPosition {
  return FlowPositionSchema.parse(pos);
}
