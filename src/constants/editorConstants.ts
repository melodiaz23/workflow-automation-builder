import { Edge, Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "node-1",
    position: { x: 0, y: 60 },
    data: {},
    type: "start",
  },
  {
    id: "node-2",
    type: "email",
    data: { email: "", emailBody: "" },
    position: { x: 160, y: 5 },
  },
  {
    id: "node-3",
    type: "wait",
    data: { duration: 1 },
    position: { x: 460, y: 75 },
  },

  {
    id: "node-4",
    type: "condition",
    data: { condicion: "" },
    position: { x: 680, y: 55 },
  },
  {
    id: "node-5",
    type: "resultTrue",
    data: { result: true },
    position: { x: 880, y: 85 },
  },
  {
    id: "node-6",
    type: "resultFalse",
    data: { result: false },
    position: { x: 690, y: 250 },
  }
];


export const initialEdges: Edge[] = [
  {
    id: "edge-1-2",
    source: "node-1",
    target: "node-2",
    animated: true,
  },
  {
    id: "edge-2-3",
    source: "node-2",
    target: "node-3",
    animated: true,
  },
  {
    id: "edge-3-4",
    source: "node-3",
    target: "node-4",
    animated: true,
  },
  {
    id: "edge-4-5",
    source: "node-4",
    target: "node-5",
    sourceHandle: "true",
    animated: true,
  },
  {
    id: "edge-4-6",
    source: "node-4",
    target: "node-6",
    sourceHandle: "false",
    animated: true,
  }
];