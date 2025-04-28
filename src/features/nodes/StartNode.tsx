import { Handle, Position } from "@xyflow/react";
import { FiPlay } from "react-icons/fi";
import { DeleteNodeButton } from "../editor/components/buttons/DeleteNodeButton";

export default function StartNode({ id }: { id: string }) {
  return (
    <>
      <div className="rounded-full bg-gradient-to-br from-green-400 to-green-600 size-24 flex items-center justify-center text-white shadow-lg relative">
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
        <div className="flex flex-col items-center justify-center">
          <FiPlay className="text-2xl mb-1" />
          <span className="font-bold text-sm">Start</span>
        </div>
        <DeleteNodeButton nodeId={id} className="absolute top-2 right-2" />
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!bg-green-400 !w-3 !h-3 !border-2 !border-white"
      />
    </>
  );
}