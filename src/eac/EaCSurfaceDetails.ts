import { EaCVertexDetails, EaCVertexDetailsSchema } from '@fathym/eac';

/**
 * Basic details structure for a Surface in Everything as Code (EaC).
 *
 * Surfaces represent user-facing dashboards or control panels.
 */
export type EaCSurfaceDetails = EaCVertexDetails;

/**
 * Schema for EaCSurfaceDetails.
 */
export const EaCSurfaceDetailsSchema = EaCVertexDetailsSchema.describe(
  'Schema for surface-level metadata and attributes.',
);

/**
 * Type guard for EaCSurfaceDetails.
 */
export function isEaCSurfaceDetails(
  details: unknown,
): details is EaCSurfaceDetails {
  return EaCSurfaceDetailsSchema.safeParse(details).success;
}

/**
 * Parses and validates an object as EaCSurfaceDetails.
 */
export function parseEaCSurfaceDetails(
  details: unknown,
): EaCSurfaceDetails {
  return EaCSurfaceDetailsSchema.parse(details);
}
