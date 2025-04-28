import { useCallback } from 'react';
import { Node, Edge } from '@xyflow/react';

const STORAGE_KEY = 'workflow';

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
}

export function useLocalStorage() {

  const saveWorkflow = useCallback((nodes: Node[], edges: Edge[]) => {
    try {
      const data: WorkflowState = { nodes, edges };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error al guardar el flujo en localStorage:', error);
      return false;
    }
  }, []);

  const loadWorkflow = useCallback(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) return null;

      return JSON.parse(savedData);
    } catch (error) {
      console.error('Error al cargar el flujo:', error);
      return null;
    }
  }, []);

  return { saveWorkflow, loadWorkflow };
}