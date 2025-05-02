import { z } from 'zod';
import {
  EaCDataConnectionDetails,
  EaCDataConnectionDetailsSchema,
} from './EaCDataConnectionDetails.ts';

/**
 * Represents the details for an Azure IoT Hub-based Data Connection in EaC.
 */
export type EaCAzureIoTHubDataConnectionDetails = {
  Type: 'AzureIoTHub';

  /** The full connection string used to access the Azure IoT Hub. */
  ConnectionString: string;

  /** The name of the device to route messages for. */
  DeviceID: string;
} & EaCDataConnectionDetails<'AzureIoTHub'>;

/**
 * Schema for validating EaCAzureIoTHubDataConnectionDetails.
 */
export const EaCAzureIoTHubDataConnectionDetailsSchema = EaCDataConnectionDetailsSchema.extend({
  Type: z.literal('AzureIoTHub'),
  ConnectionString: z.string().describe('Azure IoT Hub connection string.'),
  DeviceID: z.string().describe('Target device identifier in IoT Hub.'),
}).describe('Schema for Azure IoT Hub-based Data Connection Details');

/**
 * Type guard to validate whether a given object is an EaCAzureIoTHubDataConnectionDetails.
 */
export function isEaCAzureIoTHubDataConnectionDetails(
  conn: unknown,
): conn is EaCAzureIoTHubDataConnectionDetails {
  return EaCAzureIoTHubDataConnectionDetailsSchema.safeParse(conn).success;
}

/**
 * Parses and validates the provided data as EaCAzureIoTHubDataConnectionDetails.
 */
export function parseEaCAzureIoTHubDataConnectionDetails(
  conn: unknown,
): EaCAzureIoTHubDataConnectionDetails {
  return EaCAzureIoTHubDataConnectionDetailsSchema.parse(conn);
}
