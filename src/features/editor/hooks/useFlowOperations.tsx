import { useCallback } from 'react';
import { useReactFlow, Connection } from '@xyflow/react';

export function useFlowOperations() {
  const { setEdges, screenToFlowPosition, addNodes } = useReactFlow();

  const createNode = useCallback((
    type: string,
    position: { x: number, y: number },
    customId?: string
  ) => {
    const id = customId || `node-${Date.now()}`;

    let nodeData = {};
    switch (type) {
      case 'email':
        nodeData = { email: "", emailBody: "" };
        break;
      case 'wait':
        nodeData = { duration: 1 };
        break;
      case 'condition':
        nodeData = { condition: "" };
        break;
      case 'resultTrue':
        nodeData = { result: true };
        break;
      case 'resultFalse':
        nodeData = { result: false };
        break;
      default:
        nodeData = {};
    }

    return {
      id,
      type,
      position,
      data: nodeData,
    };
  }, []);

  const createConditionGroup = useCallback((position: { x: number, y: number }) => {
    const conditionId = `node-${Date.now()}`;
    const trueId = `true-${Date.now()}`;
    const falseId = `false-${Date.now()}`;

    const conditionNode = createNode('condition', position, conditionId);

    const trueNode = createNode(
      'resultTrue',
      { x: position.x + 200, y: position.y - 75 },
      trueId
    );

    const falseNode = createNode(
      'resultFalse',
      { x: position.x + 100, y: position.y + 150 },
      falseId
    );

    const conditionEdges = [
      {
        id: `edge-${conditionId}-true`,
        source: conditionId,
        target: trueId,
        sourceHandle: 'true',
        animated: true,
      },
      {
        id: `edge-${conditionId}-false`,
        source: conditionId,
        target: falseId,
        sourceHandle: 'false',
        animated: true,
      }
    ];

    return {
      nodes: [conditionNode, trueNode, falseNode],
      edges: conditionEdges
    };
  }, [createNode]);


  const handleConnect = useCallback((connection: Connection) => {
    const edge = {
      ...connection,
      animated: true,
      id: `${connection.source}-${connection.target}`,
      type: 'customEdge',
    };

    setEdges(eds => [...eds, edge]);
  }, [setEdges]);


  const addNodeToFlow = useCallback((type: string, position: { x: number, y: number }) => {
    if (type === 'condition') {
      const { nodes, edges } = createConditionGroup(position);
      addNodes(nodes);
      setEdges(currentEdges => [...currentEdges, ...edges]);
    } else {
      const newNode = createNode(type, position);
      addNodes(newNode);
    }
  }, [addNodes, setEdges, createNode, createConditionGroup]);


  const addNodeToCenter = useCallback((type: string) => {
    const position = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 3
    });

    addNodeToFlow(type, position);
  }, [screenToFlowPosition, addNodeToFlow]);

  return {
    createNode,
    createConditionGroup,
    handleConnect,
    addNodeToFlow,
    screenToFlowPosition,
    addNodeToCenter,
  };
}