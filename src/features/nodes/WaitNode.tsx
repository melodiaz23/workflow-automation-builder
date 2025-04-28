import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { ChangeEvent } from "react";
import { BiTimeFive } from "react-icons/bi"; // Importar ícono de tiempo
import { DeleteNodeButton } from "../editor/components/buttons/DeleteNodeButton";

export default function WaitNode({ data, id }: NodeProps) {
  const { setNodes } = useReactFlow();

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    if (value < 1) return;

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, duration: value } }
          : node
      )
    );
  };

  return (
    <>
      <div className="rounded-xl bg-gradient-to-br from-orange-300 to-orange-400 shadow-md flex flex-col items-center justify-center text-white p-4 relative min-w-[140px]">
        <div className="flex items-center gap-2 mb-3">
          <BiTimeFive className="text-xl" />
          <h2 className="font-bold text-base">Wait</h2>
        </div>

        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg p-2 w-full">
          <input
            type="number"
            min="1"
            value={(data.duration || 1).toString()}
            onChange={handleDurationChange}
            className="w-16 px-2 py-1 border-0 bg-white/80 rounded text-center text-orange-900 font-medium focus:outline-none focus:ring-2 focus:ring-white"
          />
          <span className="text-white/90 font-medium">hours</span>
        </div>

        <DeleteNodeButton nodeId={id} />
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!bg-indigo-400 !w-3 !h-3 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        className="!bg-indigo-400 !w-3 !h-3 !border-2 !border-white"
      />
    </>
  );
}