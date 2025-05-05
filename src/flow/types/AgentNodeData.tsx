import { EaCAgentDetails } from '../../eac/EaCAgentDetails.ts';
import { FlowNodeData } from './react/FlowNodeData.ts';
import { AgentStats } from './AgentStats.tsx';


export type AgentNodeData = FlowNodeData<EaCAgentDetails, AgentStats>;
