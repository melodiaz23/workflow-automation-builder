import { Handle, NodeProps, Position } from "@xyflow/react";
import { DeleteNodeButton } from "../editor/components/buttons/DeleteNodeButton";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { HiOutlineXCircle } from "react-icons/hi";

export default function ResultNode({ data, id }: NodeProps) {
  const isTrue = data.result === true;

  return (
    <>
      <div
        className={`rounded-lg p-3 w-28 h-16 flex items-center justify-center relative shadow-md
          ${isTrue
            ? 'bg-gradient-to-br from-green-300 to-green-500'
            : 'bg-gradient-to-br from-red-300 to-red-500'}`}
      >
        <div className="flex items-center gap-2">
          {isTrue
            ?
            <IoMdCheckmarkCircleOutline className="text-white text-lg" />
            : <HiOutlineXCircle className="text-white text-lg" />
          }
          <span className="font-bold text-sm text-white">
            {isTrue ? 'TRUE' : 'FALSE'}
          </span>
        </div>

        <DeleteNodeButton
          nodeId={id}
        />
      </div>

      <Handle
        type="target"
        position={isTrue ? Position.Left : Position.Top}
        style={{ backgroundColor: isTrue ? '#22c55e' : '#ef4444' }}
        className={`!w-3 !h-3 !border-2 !border-white`}
      />
    </>
  );
}