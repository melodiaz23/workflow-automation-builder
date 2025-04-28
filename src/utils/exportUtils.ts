import { Node, Edge } from '@xyflow/react';
import { ConditionNode, FormattedNode, WorkflowData } from '../types/editorTypes';

export function formatWorkflowJson(nodes: Node[], edges: Edge[]): WorkflowData {


  const startNode = nodes.find(node => node.type === 'start');
  if (!startNode?.id) {
    throw new Error("No se encontró un nodo de inicio en el flujo de trabajo.");
  }

  const startConnections = edges.filter(edge => edge.source === startNode.id);
  if (startConnections.length === 0) {
    throw new Error("El nodo de inicio no está conectado a ningún otro nodo.");
  }

  const connectionMap = createConnectionMap(edges);

  const orderedIds = getOrderedNodeIds(nodes, edges, startNode.id, connectionMap);

  const formattedNodes = orderedIds.map(id => {
    const node = nodes.find(n => n.id === id)!;
    return formatNode(node, connectionMap[id] || []);
  });

  return {
    start: startNode.id,
    nodes: formattedNodes,
  };
}

function createConnectionMap(edges: Edge[]): Record<string, { target: string, sourceHandle?: string | null }[]> {

  const map: Record<string, { target: string, sourceHandle?: string | null }[]> = {};

  edges.forEach(edge => {
    if (!map[edge.source]) {
      map[edge.source] = [];
    }
    map[edge.source].push({
      target: edge.target,
      sourceHandle: edge.sourceHandle || null
    });
  });

  return map;
}

function getOrderedNodeIds(
  nodes: Node[],
  edges: Edge[],
  startNodeId: string,
  connectionMap: Record<string, { target: string, sourceHandle?: string | null }[]>
): string[] {

  const orderedIds: string[] = [];
  const processed = new Set<string>();
  const stack: string[] = [];


  const firstNodeId = edges.find(edge => edge.source === startNodeId)?.target;
  if (firstNodeId) {
    stack.push(firstNodeId);
  }


  // Emplea método de ordenación DFS para recorrer los nodos
  while (stack.length > 0) {
    const nodeId = stack.pop()!;
    if (processed.has(nodeId)) continue; // Si ya fue procesado, lo ignoramos

    processed.add(nodeId);

    if (nodeId !== startNodeId) {
      orderedIds.push(nodeId);
    }

    // Busca conexiones del nodo actual
    const connections = connectionMap[nodeId] || [];
    const nodeType = nodes.find(n => n.id === nodeId)?.type;

    if (nodeType === 'condition') {
      const falseConn = connections.find(conn => conn.sourceHandle === 'false');
      const trueConn = connections.find(conn => conn.sourceHandle === 'true');
      if (falseConn) stack.push(falseConn.target);
      if (trueConn) stack.push(trueConn.target);
    } else {
      for (let i = connections.length - 1; i >= 0; i--) {
        stack.push(connections[i].target);
      }
    }
  }

  nodes
    .filter(node => node.id !== startNodeId && !orderedIds.includes(node.id))
    .forEach(node => orderedIds.push(node.id));

  return orderedIds;
}

function formatNode(
  node: Node,
  connections: { target: string, sourceHandle?: string | null }[]
): FormattedNode {
  const formatted: FormattedNode = {
    id: node.id,
    type: node.type || 'default',
    data: {}
  };

  // Asignar conexiones según tipo
  if (node.type === 'condition') {
    const conditionNode = formatted as ConditionNode;
    const trueConn = connections.find(conn => conn.sourceHandle === 'true');
    const falseConn = connections.find(conn => conn.sourceHandle === 'false');

    if (trueConn) conditionNode.nextTrue = trueConn.target;
    if (falseConn) conditionNode.nextFalse = falseConn.target;
  } else {
    const firstConn = connections[0];
    if (firstConn) {
      formatted.next = firstConn.target;
    }
  }

  switch (node.type) {
    case 'email':
      formatted.data = {
        title: node.data?.title || '',
        content: node.data?.emailBody || ''
      };
      break;
    case 'wait':
      formatted.data = {
        duration: node.data?.duration || 1
      };
      break;
    case 'condition':
      formatted.data = {
        condition: node.data?.condition || ''
      };
      break;
    default:
      formatted.data = node.data || {};
  }

  return formatted;
}