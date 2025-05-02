import z from 'zod';
import { EaCAgentAsCode, EaCAgentAsCodeSchema } from './EaCAgentAsCode.ts';
import {
  EaCDataConnectionAsCode,
  EaCDataConnectionAsCodeSchema,
} from './EaCDataConnectionAsCode.ts';
import { EaCSchemaAsCode, EaCSchemaAsCodeSchema } from './EaCSchemaAsCode.ts';
import { EaCSurfaceAsCode, EaCSurfaceAsCodeSchema } from './EaCSurfaceAsCode.ts';
import { EaCSimulatorAsCode, EaCSimulatorAsCodeSchema } from './EaCSimulatorAsCode.ts';

// Optional config types
export type ImpulseOptions = {
  RetainWindowSeconds?: number;
  StorePath?: string;
  AutoArchive?: boolean;
  AllowReplay?: boolean;
};

export type SignalOptions = {
  Store?: 'Memory' | 'DFS' | 'External';
  RetentionSeconds?: number;
  PersistOnTrigger?: boolean;
  DefaultSignalShape?: 'event' | 'proposal' | 'patch';
};

export type EverythingAsCodeOIWorkspace = {
  /** Optional global runtime policies */
  $GlobalOptions?: {
    Impulses?: ImpulseOptions;
    Signals?: SignalOptions;
  };

  /** Executable reflex agents */
  Agents?: Record<string, EaCAgentAsCode>;

  /** External or streaming connections */
  DataConnections?: Record<string, EaCDataConnectionAsCode>;

  /** Stream or file-backed input schemas */
  Schemas?: Record<string, EaCSchemaAsCode>;

  /** Simulators that drive impulse flows */
  Simulators?: Record<string, EaCSimulatorAsCode>;

  /** Panels, simulators, dashboards */
  Surfaces?: Record<string, EaCSurfaceAsCode>;
};

export const EverythingAsCodeOIWorkspaceSchema = z.object({
  $GlobalOptions: z
    .object({
      Impulses: z
        .object({
          RetainWindowSeconds: z.number().optional(),
          StorePath: z.string().optional(),
          AutoArchive: z.boolean().optional(),
          AllowReplay: z.boolean().optional(),
        })
        .optional(),
      Signals: z
        .object({
          Store: z.enum(['Memory', 'DFS', 'External']).optional(),
          RetentionSeconds: z.number().optional(),
          PersistOnTrigger: z.boolean().optional(),
          DefaultSignalShape: z
            .enum(['event', 'proposal', 'patch'])
            .optional(),
        })
        .optional(),
    })
    .optional(),

  Agents: z.record(EaCAgentAsCodeSchema).optional(),
  DataConnections: z.record(EaCDataConnectionAsCodeSchema).optional(),
  Schemas: z.record(EaCSchemaAsCodeSchema).optional(),
  Simulators: z.record(EaCSimulatorAsCodeSchema).optional(),
  Surfaces: z.record(EaCSurfaceAsCodeSchema).optional(),
});

export function isEverythingAsCodeOIWorkspace(
  eac: unknown,
): eac is EverythingAsCodeOIWorkspace {
  return EverythingAsCodeOIWorkspaceSchema.safeParse(eac).success;
}

export function parseEverythingAsCodeOIWorkspace(
  eac: unknown,
): EverythingAsCodeOIWorkspace {
  return EverythingAsCodeOIWorkspaceSchema.parse(eac);
}
