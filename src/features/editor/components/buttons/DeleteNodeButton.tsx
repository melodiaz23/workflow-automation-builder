import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNodeDeletion } from "../../hooks/useNodeDeletion";

interface DeleteNodeButtonProps {
  nodeId: string;
  className?: string;
  isCondition?: boolean;
}

export function DeleteNodeButton({
  nodeId,
  className = "",
  isCondition = false,
}: DeleteNodeButtonProps) {

  const { deleteNode } = useNodeDeletion();

  return (
    <button
      className={`absolute text-sm -top-1 -right-0.5 flex items-center justify-center rounded-full bg-gray-400/70 text-white hover:bg-gray-600 hover:scale-125 ${className}`}
      onClick={() => deleteNode(nodeId, isCondition)}
      aria-label="Delete node"
    >
      <IoIosCloseCircleOutline />
    </button>
  );
}