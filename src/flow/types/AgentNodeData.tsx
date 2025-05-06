import { EaCAgentDetails } from '@o-industrial/common/eac';
import { FlowNodeData } from './react/FlowNodeData.ts';
import { AgentStats } from './AgentStats.tsx';

export type AgentNodeData = FlowNodeData<EaCAgentDetails, AgentStats>;
