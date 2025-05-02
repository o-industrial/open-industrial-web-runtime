import { EaCDetails, EaCDetailsSchema } from '@fathym/eac';
import z from 'zod';
import { EaCDataConnectionDetails, EaCDataConnectionDetailsSchema } from "./EaCDataConnectionDetails.ts";

/**
 * Represents an Everything as Code (EaC) Data Connection.
 *
 * Data connections do not define relationships; they are globally declared,
 * and other nodes (e.g. surfaces) may point to them via lookup keys.
 */
export type EaCDataConnectionAsCode = EaCDetails<EaCDataConnectionDetails> & {
  /** Optional lookup key for associating this connection with a simulator instance. */
  SimulatorLookup?: string;
};

/**
 * Schema for EaCDataConnectionAsCode.
 */
export const EaCDataConnectionAsCodeSchema = EaCDetailsSchema.extend({
  Details: EaCDataConnectionDetailsSchema.optional(),
  SimulatorLookup: z.string().optional().describe("Optional lookup key for associated simulator."),
});

/**
 * Type guard for EaCDataConnectionAsCode.
 */
export function isEaCDataConnectionAsCode(
  conn: unknown,
): conn is EaCDataConnectionAsCode {
  return EaCDataConnectionAsCodeSchema.safeParse(conn).success;
}

/**
 * Validates and parses an object as EaCDataConnectionAsCode.
 */
export function parseEaCDataConnectionAsCode(
  conn: unknown,
): EaCDataConnectionAsCode {
  return EaCDataConnectionAsCodeSchema.parse(conn);
}
