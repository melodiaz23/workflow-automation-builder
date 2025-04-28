import { FiSave } from "react-icons/fi";

interface SaveButtonProps {
  onSave: () => void;
}

export default function SaveButton({ onSave }: SaveButtonProps) {
  return (
    <button
      onClick={onSave}
      className="w-28 text-center absolute top-16 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 flex items-center justify-center gap-2 z-10"
    >
      <FiSave className="text-lg" />
      Save
    </button>
  );
}