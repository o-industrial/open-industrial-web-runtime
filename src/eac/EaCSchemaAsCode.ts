import { EaCDetails, EaCDetailsSchema } from '@fathym/eac';
import { EaCSchemaDetails, EaCSchemaDetailsSchema } from './EaCSchemaDetails.ts';

/**
 * Everything as Code (EaC) schema container.
 * Includes structural metadata and details that vary by schema type.
 */
export type EaCSchemaAsCode = EaCDetails<EaCSchemaDetails>;

/**
 * Schema for EaCSchemaAsCode.
 */
export const EaCSchemaAsCodeSchema = EaCDetailsSchema.extend({
  Details: EaCSchemaDetailsSchema.optional(),
});

export function isEaCSchemaAsCode(
  schema: unknown,
): schema is EaCSchemaAsCode {
  return EaCSchemaAsCodeSchema.safeParse(schema).success;
}

export function parseEaCSchemaAsCode(
  schema: unknown,
): EaCSchemaAsCode {
  return EaCSchemaAsCodeSchema.parse(schema);
}
