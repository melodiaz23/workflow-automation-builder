import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { ChangeEvent } from "react";
import { DeleteNodeButton } from "../editor/components/buttons/DeleteNodeButton";
import { FiMail } from "react-icons/fi";

export default function EmailNode({ data, id }: NodeProps) {
  const { setNodes } = useReactFlow();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, title: value } }
          : node
      )
    );
  };

  const handleEmailBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, emailBody: value } }
          : node
      )
    );
  };

  return (
    <>
      <div className="rounded-xl bg-gradient-to-br from-blue-300 to-blue-500 shadow-md flex flex-col items-center justify-center text-white p-4 relative min-w-[250px]">
        <div className="flex items-center gap-2 mb-1">
          <FiMail className="text-lg" />
          <h2 className="font-bold text-lg">Email</h2>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex flex-col">
            <label htmlFor={`title-${id}`} className="mb-1 font-medium opacity-90">
              Title:
            </label>
            <input
              type="text"
              id={`title-${id}`}
              value={(data.title || '').toString()}
              onChange={handleTitleChange}
              placeholder="Subject"
              className="px-2 py-1 rounded text-blue-900 border border-blue-200 focus:outline-none focus:ring-2 focus:ring-white bg-white/80"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor={`emailBody-${id}`} className="mb-1 font-medium opacity-90">
              Content:
            </label>
            <textarea
              id={`emailBody-${id}`}
              value={(data.emailBody || '').toString()}
              onChange={handleEmailBodyChange}
              placeholder="Type your message here..."
              rows={4}
              className="px-2 py-1 rounded text-blue-900 border border-blue-200 resize-none focus:outline-none focus:ring-2 focus:ring-white bg-white/80"
            />
          </div>
        </div>

        <DeleteNodeButton nodeId={id} className="-right-0.5 -top-0.5" />
      </div>

      <Handle type="target" position={Position.Left} className="!bg-blue-600 !w-3 !h-3 !border-2 !border-white" />
      <Handle type="source" position={Position.Right} id="a" className="!bg-blue-600 !w-3 !h-3 !border-2 !border-white" />
    </>
  );
}