import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

export function useNodeDeletion() {
  const { setNodes, setEdges, getEdges } = useReactFlow();

  const deleteNode = useCallback((nodeId: string, isCondition: boolean = false) => {
    const edges = getEdges();

    if (isCondition) {
      // Elimina nodos de condición y sus resultados conectados
      const connectedResultIds = new Set(
        edges
          .filter(edge => edge.source === nodeId)
          .map(edge => edge.target)
      );

      setNodes(nodes => nodes.filter(
        node => node.id !== nodeId && !connectedResultIds.has(node.id)
      ));

      setEdges(edges => edges.filter(edge =>
        edge.source !== nodeId &&
        !connectedResultIds.has(edge.target)
      ));
    } else {
      const relatedEdgeIds = edges
        .filter(edge => edge.source === nodeId || edge.target === nodeId)
        .map(edge => edge.id);

      setNodes(nodes => nodes.filter(node => node.id !== nodeId));
      setEdges(edges => edges.filter(edge => !relatedEdgeIds.includes(edge.id)));
    }
  }, [getEdges, setNodes, setEdges]);

  return { deleteNode };
}