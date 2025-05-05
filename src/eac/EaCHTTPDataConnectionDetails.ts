import { z } from 'zod';
import {
  EaCDataConnectionDetails,
  EaCDataConnectionDetailsSchema,
} from './EaCDataConnectionDetails.ts';

/**
 * Represents the details for an HTTP-based Data Connection in EaC.
 */
export type EaCHTTPDataConnectionDetails = {
  Type: 'HTTP';

  /** The HTTP endpoint URL that will receive the incoming data. */
  Endpoint: string;

  /** Optional headers that should be included in HTTP requests. */
  Headers?: Record<string, string>;

  /** The expected HTTP method for ingestion (e.g., POST, PUT). */
  Method?: 'POST' | 'PUT';
} & EaCDataConnectionDetails<'HTTP'>;

/**
 * Schema for validating EaCHTTPDataConnectionDetails.
 */
export const EaCHTTPDataConnectionDetailsSchema = EaCDataConnectionDetailsSchema.extend({
  Type: z.literal('HTTP'),
  Endpoint: z.string().url().describe('Target HTTP endpoint for data ingestion.'),
  Headers: z.record(z.string()).optional().describe('Optional headers to send with each request.'),
  Method: z.enum(['POST', 'PUT']).optional().describe('HTTP method to use for incoming data.'),
}).describe('Schema for HTTP-based Data Connection Details');

/**
 * Type guard to validate whether a given object is an EaCHTTPDataConnectionDetails.
 */
export function isEaCHTTPDataConnectionDetails(
  conn: unknown,
): conn is EaCHTTPDataConnectionDetails {
  return EaCHTTPDataConnectionDetailsSchema.safeParse(conn).success;
}

/**
 * Parses and validates the provided data as EaCHTTPDataConnectionDetails.
 */
export function parseEaCHTTPDataConnectionDetails(
  conn: unknown,
): EaCHTTPDataConnectionDetails {
  return EaCHTTPDataConnectionDetailsSchema.parse(conn);
}
