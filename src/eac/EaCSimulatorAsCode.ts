import { EaCDetails, EaCDetailsSchema } from '@fathym/eac';
import { EaCSimulatorDetails, EaCSimulatorDetailsSchema } from './EaCSimulatorDetails.ts';

/**
 * Represents a deployed simulator instance within an Everything as Code (EaC) workspace.
 *
 * This is a standalone container with no outbound relationships — it exists to
 * configure and persist simulator runtime context, which may be referenced by
 * DataConnections via `SimulatorLookup`.
 */
export type EaCSimulatorAsCode = EaCDetails<EaCSimulatorDetails>;

/**
 * Schema for EaCSimulatorAsCode.
 */
export const EaCSimulatorAsCodeSchema = EaCDetailsSchema.extend({
  Details: EaCSimulatorDetailsSchema.optional(),
});

/**
 * Type guard for EaCSimulatorAsCode.
 */
export function isEaCSimulatorAsCode(
  sim: unknown,
): sim is EaCSimulatorAsCode {
  return EaCSimulatorAsCodeSchema.safeParse(sim).success;
}

/**
 * Validates and parses an object as EaCSimulatorAsCode.
 */
export function parseEaCSimulatorAsCode(
  sim: unknown,
): EaCSimulatorAsCode {
  return EaCSimulatorAsCodeSchema.parse(sim);
}
