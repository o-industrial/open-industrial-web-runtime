// import { useMemo, useState } from 'preact/hooks';
// import { FlowManager, NodeScopeTypes } from './FlowManager.ts';
// import { Edge, Node } from 'reactflow';
// import { FlowNodeData } from './FlowNodeData.ts';

// export function useFlowManagerLifecycle(scope: NodeScopeTypes): FlowManager {
//   const [nodes, setNodes] = useState<Node<FlowNodeData>[]>([]);
//   const [edges, setEdges] = useState<Edge[]>([]);
//   const [selectedIds, setSelectedIds] = useState<string[]>([]);

//   const manager = useMemo(() => new FlowManager(scope), [scope]);

//   // One-time binding
//   manager.bindLifecycle({ setNodes, setEdges, setSelectedIds });

//   return manager;
// }
