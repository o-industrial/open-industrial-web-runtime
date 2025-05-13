import { EaCSchemaDetails } from '@o-industrial/common/eac';
import { FlowNodeData } from '../../react/FlowNodeData.ts';
import { SchemaStats } from './SchemaStats.tsx';

export type SchemaNodeData = FlowNodeData<EaCSchemaDetails, SchemaStats>;
