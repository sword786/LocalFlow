import { Handle, Position } from 'reactflow';
import { BrainCircuit } from 'lucide-react';

export default function LLMNode({ data }: { data: any }) {
  return (
    <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-xl w-64">
      <Handle type="target" position={Position.Left} className="!bg-blue-500" />
      
      <div className="flex items-center gap-3 bg-gray-900 p-3 rounded-t-xl border-b border-gray-700">
        <BrainCircuit className="text-blue-400" size={20} />
        <span className="font-semibold text-gray-100 text-sm">Local LLM</span>
      </div>
      
      <div className="p-4 flex flex-col gap-2">
        <label className="text-xs text-gray-400">Model (Ollama)</label>
        <select className="bg-gray-900 border border-gray-700 text-white text-sm rounded-md p-2 outline-none focus:border-blue-500 transition-colors">
          <option>llama3</option>
          <option>mistral</option>
          <option>phi3</option>
        </select>
      </div>

      <Handle type="source" position={Position.Right} className="!bg-blue-500" />
    </div>
  );
}
