import { useReactFlow } from "@xyflow/react";
import { PiExport } from "react-icons/pi";
import { WorkflowData } from "../../../../types/editorTypes";
import { formatWorkflowJson } from "../../../../utils/exportUtils";


export default function ExportButton() {
  const { getNodes, getEdges } = useReactFlow();

  const handleExport = () => {
    const nodes = getNodes();
    const edges = getEdges();

    try { // Incluye validación del nodo de inicio
      const workflow: WorkflowData = formatWorkflowJson(nodes, edges);
      const dataStr = JSON.stringify(workflow, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
      const exportFileDefaultName = 'workflow.json';
      // Mecanismo de descarga
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      console.info('Workflow exportado correctamente:', workflow);

    } catch (error: unknown) {

      alert((error as Error).message || 'Error exportando el workflow.');
      console.error(error);

    }
  };


  return (
    <button
      onClick={handleExport}
      className="w-28 absolute top-4 right-4 bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 flex items-center gap-2 z-10"
    >
      <PiExport className="text-lg" />
      Export
    </button>
  );
}