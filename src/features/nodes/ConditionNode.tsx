import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { ChangeEvent } from "react";
import { DeleteNodeButton } from "../editor/components/buttons/DeleteNodeButton";
import { FiHelpCircle } from "react-icons/fi";

export default function ConditionNode({ data, id }: NodeProps) {
  const { setNodes } = useReactFlow();

  const handleConditionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, condition: value } }
          : node
      )
    );
  };

  return (
    <>
      <div className="relative flex items-center justify-center">
        <div className="size-40 rounded-2xl bg-gradient-to-br from-purple-400 to-blue-300 relative shadow-md">

          <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-white">
            <div className="flex items-center gap-1 mb-1">
              <FiHelpCircle className=" text-lg" />
              <h2 className="font-bold ">Condition</h2>
            </div>
            <input
              type="text"
              placeholder="Enter condition..."
              value={(data.condition || "").toString()}
              onChange={handleConditionChange}
              className="w-36 px-2 py-1.5 text-sm text-purple-900 border border-purple-300 rounded text-center bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder:text-gray-500 placeholder:text-xs"
            />
            <DeleteNodeButton nodeId={id} isCondition={true} className="-top-1 -right-1" />
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="!bg-purple-400 !w-3 !h-3 !border-2 !border-white"
      />

      <Handle
        type="source"
        position={Position.Right}
        id="true"
        className="!bg-purple-400 !w-3 !h-3 !border-2 !border-white"
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="false"
        className="!bg-purple-400 !w-3 !h-3 !border-2 !border-white"
      />
    </>
  );
}