import { z } from 'zod';
import {
  EaCSchemaDetails,
  EaCSchemaDetailsSchema,
} from './EaCSchemaDetails.ts';
import { JSONSchemaMap, JSONSchemaMapSchema } from '../types/JSONSchemaMap.ts';

/**
 * Represents a Root schema definition — raw telemetry or signal-bearing structure.
 *
 * These are the schemas directly populated from external DataConnections.
 */
export type EaCRootSchemaDetails = EaCSchemaDetails<'Root'> & {
  /** Lookup key to the bound data connection providing impulse data. */
  DataConnectionLookup?: string;

  /** Settings for mapping data connection input into schema fields. */
  DataConnectionSchemaMap?: JSONSchemaMap;
};

/**
 * Schema for EaCRootSchemaDetails.
 */
export const EaCRootSchemaDetailsSchema: z.ZodType<EaCRootSchemaDetails> =
  EaCSchemaDetailsSchema.extend({
    Type: z.literal('Root'),
    DataConnectionLookup: z
      .string()
      .optional()
      .describe(
        "Key for resolving the DataConnection that supplies this schema's data."
      ),
    DataConnectionSettings: z
      .object({
        JSONSchemaMap: JSONSchemaMapSchema.optional(),
      })
      .catchall(z.unknown())
      .optional()
      .describe('Configuration for mapping incoming data into this schema.'),
  }).describe('Schema for Root-type schema used for raw data ingestion.');

export function isEaCRootSchemaDetails(
  details: unknown
): details is EaCRootSchemaDetails {
  return EaCRootSchemaDetailsSchema.safeParse(details).success;
}

export function parseEaCRootSchemaDetails(
  details: unknown
): EaCRootSchemaDetails {
  return EaCRootSchemaDetailsSchema.parse(details);
}
