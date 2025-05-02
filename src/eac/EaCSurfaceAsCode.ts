import { z } from 'zod';
import { EaCDetails, EaCDetailsSchema } from '@fathym/eac';
import { EaCSurfaceDetails, EaCSurfaceDetailsSchema } from './EaCSurfaceDetails.ts';
import { Position } from '../types/Position.ts';

/**
 * Connection-specific runtime configuration used by a surface.
 */
export type SurfaceDataConnectionSettings = {
  Enabled?: boolean;
  TumblingWindowSeconds?: number;
  Position?: Position;
  [key: string]: unknown;
};

/**
 * Agent-specific surface rendering settings.
 */
export type SurfaceAgentSettings = {
  Enabled?: boolean;
  ShowHistory?: boolean;
  Position?: Position;
  [key: string]: unknown;
};

/**
 * Schema-specific surface rendering settings.
 */
export type SurfaceSchemaSettings = {
  Enabled?: boolean;
  DisplayMode?: 'raw' | 'graph' | 'table';
  Position?: Position;
  [key: string]: unknown;
};

/**
 * Child surface rendering or embedding settings.
 */
export type SurfaceChildSettings = {
  Enabled?: boolean;
  Collapsible?: boolean;
  DefaultCollapsed?: boolean;
  Position?: Position;
  [key: string]: unknown;
};

/**
 * Represents a Surface in Everything as Code (EaC).
 *
 * Surfaces are user-facing panels, tools, or dashboards.
 */
export type EaCSurfaceAsCode = EaCDetails<EaCSurfaceDetails> & {
  ParentSurfaceLookup?: string;
  DataConnections?: Record<string, SurfaceDataConnectionSettings>;
  Agents?: Record<string, SurfaceAgentSettings>;
  Schemas?: Record<string, SurfaceSchemaSettings>;
  Surfaces?: Record<string, SurfaceChildSettings>;
};

export const SurfacePositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const EaCSurfaceAsCodeSchema = EaCDetailsSchema.extend({
  Details: EaCSurfaceDetailsSchema.optional(),
  ParentSurfaceLookup: z.string().optional().describe('Optional reference to a parent surface.'),
  DataConnections: z
    .record(
      z.object({
        Enabled: z.boolean().optional(),
        TumblingWindowSeconds: z.number().optional(),
        Position: SurfacePositionSchema.optional(),
      }).catchall(z.unknown()),
    )
    .optional()
    .describe('Mapping of data connection keys to runtime settings.'),
  Agents: z
    .record(
      z.object({
        Enabled: z.boolean().optional(),
        ShowHistory: z.boolean().optional(),
        Position: SurfacePositionSchema.optional(),
      }).catchall(z.unknown()),
    )
    .optional()
    .describe('Mapping of agent keys to surface display settings.'),
  Schemas: z
    .record(
      z.object({
        Enabled: z.boolean().optional(),
        DisplayMode: z.enum(['raw', 'graph', 'table']).optional(),
        Position: SurfacePositionSchema.optional(),
      }).catchall(z.unknown()),
    )
    .optional()
    .describe('Mapping of schema keys to visual mode settings.'),
  Surfaces: z
    .record(
      z.object({
        Enabled: z.boolean().optional(),
        Collapsible: z.boolean().optional(),
        DefaultCollapsed: z.boolean().optional(),
        Position: SurfacePositionSchema.optional(),
      }).catchall(z.unknown()),
    )
    .optional()
    .describe('Mapping of child surface keys to container behavior settings.'),
});

export function isEaCSurfaceAsCode(
  surface: unknown,
): surface is EaCSurfaceAsCode {
  return EaCSurfaceAsCodeSchema.safeParse(surface).success;
}

export function parseEaCSurfaceAsCode(
  surface: unknown,
): EaCSurfaceAsCode {
  return EaCSurfaceAsCodeSchema.parse(surface);
}
