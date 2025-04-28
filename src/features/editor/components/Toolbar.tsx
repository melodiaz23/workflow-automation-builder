import { DragEvent } from "react";
import { useDnD } from "../hooks/useDnD";
import { useFlowOperations } from "../hooks/useFlowOperations";

export default function Toolbar() {
  const [, setNodeType] = useDnD();
  const { addNodeToCenter } = useFlowOperations();

  const onDragStart = (event: DragEvent, nodeType: string) => {
    if (nodeType === null) return;
    event.dataTransfer.setData('application/reactflow', nodeType);
    setNodeType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-200/40 rounded-lg p-3 shadow-lg flex gap-5 items-center z-10">
      <div
        className="size-16 rounded-full bg-green-200 border-2 border-green-400 flex items-center justify-center cursor-pointer hover:bg-green-300 hover:scale-105"
        onClick={() => addNodeToCenter('start')}
        draggable
        onDragStart={(event) => onDragStart(event, 'start')}
      >
        <span className="text-xs font-bold text-green-700">START</span>
      </div>
      <div
        className="size-16 rounded-md bg-blue-200 border-2 border-blue-400 flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:scale-105"
        onClick={() => addNodeToCenter('email')}
        draggable
        onDragStart={(event) => onDragStart(event, 'email')}
      >
        <span className="text-xs font-bold text-blue-600">EMAIL</span>
      </div>
      <div
        className="size-16 transform bg-purple-200 rounded-2xl border-2 border-purple-400 flex items-center justify-center cursor-pointer hover:bg-purple-300 hover:scale-105"
        onClick={() => addNodeToCenter('condition')}
        draggable
        onDragStart={(event) => onDragStart(event, 'condition')}
      >
        <span className="text-xs font-bold text-purple-600 transform">COND</span>
      </div>
      <div
        className="size-16 rounded-md bg-orange-200 border-2 border-dashed border-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-300 hover:scale-105"
        onClick={() => addNodeToCenter('wait')}
        draggable
        onDragStart={(event) => onDragStart(event, 'wait')}
      >
        <span className="text-xs font-bold text-orange-600">WAIT</span>
      </div>
    </div>
  );
}