import { useState, useCallback } from 'react';
import ReactFlow, { Background, Controls, addEdge, applyNodeChanges, applyEdgeChanges, Connection, Edge, Node, NodeChange, EdgeChange } from 'reactflow';
import LLMNode from './components/nodes/LLMNode';
import { Play } from 'lucide-react';

const nodeTypes = { llmNode: LLMNode };

const initialNodes: Node[] = [
  { id: '1', type: 'input', position: { x: 100, y: 200 }, data: { label: 'Input: User Prompt' }, className: 'bg-gray-800 text-white border-gray-700 rounded-xl p-4 shadow-lg' },
  { id: '2', type: 'llmNode', position: { x: 400, y: 150 }, data: { model: 'llama3' } },
  { id: '3', type: 'output', position: { x: 800, y: 200 }, data: { label: 'Output: AI Response' }, className: 'bg-gray-800 text-white border-gray-700 rounded-xl p-4 shadow-lg' },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
];

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [isRunning, setIsRunning] = useState(false);

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } }, eds)), []);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      alert("Pipeline executed! (Connect to local Ollama API in v1.1)");
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="w-screen h-screen bg-gray-950 flex flex-col font-sans">
      <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 shadow-md z-10">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">LocalFlow</h1>
        <button onClick={handleRun} disabled={isRunning} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all">
          <Play size={16} className={isRunning ? "animate-pulse" : ""} />
          {isRunning ? 'Running...' : 'Run Agent'}
        </button>
      </header>
      <div className="flex-1 w-full h-full">
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} fitView>
          <Background color="#374151" gap={20} size={1} />
          <Controls className="bg-gray-800 fill-white border-gray-700" />
        </ReactFlow>
      </div>
    </div>
  );
}
