import '@xyflow/react/dist/style.css';
import { Background, ReactFlow, useNodesState, useEdgesState, ReactFlowProvider } from '@xyflow/react';
import { nodeTypes } from '../../../types/nodeTypes';
import { initialEdges, initialNodes } from '../../../constants/editorConstants';
import { useRef, useEffect, useCallback } from 'react';
import { DnDProvider } from '../providers/DnDProvider';
import ExportButton from './buttons/ExportButton';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SaveButton from './buttons/SaveButton';
import { useFlowOperations } from '../hooks/useFlowOperations';
import { useDragDrop } from '../hooks/useDragDrop';
import Toolbar from './Toolbar';


function FlowEditorContent() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { saveWorkflow, loadWorkflow } = useLocalStorage();

  const { handleConnect } = useFlowOperations();
  const { onDragOver, onDrop } = useDragDrop();

  useEffect(() => {
    const savedWorkflow = loadWorkflow();
    if (savedWorkflow) {
      setNodes(savedWorkflow.nodes);
      setEdges(savedWorkflow.edges);
    }
  }, [loadWorkflow, setEdges, setNodes]);


  const handleSave = useCallback(() => {
    const success = saveWorkflow(nodes, edges);
    if (success) {
      alert('Flujo guardado exitosamente');
    } else {
      alert('Error al guardar el flujo');
    }
  }, [nodes, edges, saveWorkflow]);

  return (
    <div className='h-screen w-screen' ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={handleConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
      >
        <Background className='bg-gray-900' gap={16} />
        <Toolbar />
        <ExportButton />
        <SaveButton onSave={handleSave} />
      </ReactFlow>
    </div>
  );
}

export default function FlowEditor() {
  return (
    <ReactFlowProvider>
      <DnDProvider>
        <FlowEditorContent />
      </DnDProvider>
    </ReactFlowProvider>
  );
}