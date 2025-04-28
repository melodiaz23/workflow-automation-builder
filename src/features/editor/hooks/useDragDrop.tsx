import { useCallback } from 'react';

import { useFlowOperations } from './useFlowOperations';
import { useDnD } from './useDnD';


export function useDragDrop() {
  const [nodeType] = useDnD();
  const { addNodeToFlow, screenToFlowPosition } = useFlowOperations();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!nodeType) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNodeToFlow(nodeType, position);
    },
    [nodeType, screenToFlowPosition, addNodeToFlow]
  );

  return { onDragOver, onDrop };
}