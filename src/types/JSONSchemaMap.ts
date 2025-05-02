import { z } from "zod";
import { FieldMappingRule, FieldMappingRuleSchema } from './FieldMappingRule.ts';

export type JSONSchemaMap = Record<string, FieldMappingRule>;

/**
 * Zod schema for a JSONSchemaMap:
 * Maps target field names to FieldMappingRule definitions.
 */
export const JSONSchemaMapSchema = z.record(FieldMappingRuleSchema);
