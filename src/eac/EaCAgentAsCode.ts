import { EaCDetails, EaCDetailsSchema } from "@fathym/eac";
import {
  EaCAgentDetails,
  EaCAgentDetailsSchema,
} from "./EaCAgentDetails.ts";

/**
 * Represents an Agent in Everything as Code (EaC).
 *
 * Agents contain decision logic, and operate over schemas via reflex-style evaluations.
 */
export type EaCAgentAsCode = EaCDetails<EaCAgentDetails>;

/**
 * Schema for EaCAgentAsCode.
 */
export const EaCAgentAsCodeSchema = EaCDetailsSchema.extend({
  Details: EaCAgentDetailsSchema.optional(),
});

/**
 * Type guard for EaCAgentAsCode.
 */
export function isEaCAgentAsCode(
  agent: unknown,
): agent is EaCAgentAsCode {
  return EaCAgentAsCodeSchema.safeParse(agent).success;
}

/**
 * Parses and validates an object as EaCAgentAsCode.
 */
export function parseEaCAgentAsCode(
  agent: unknown,
): EaCAgentAsCode {
  return EaCAgentAsCodeSchema.parse(agent);
}
