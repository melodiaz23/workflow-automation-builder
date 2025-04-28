export interface WorkflowData {
  start?: string;
  nodes: FormattedNode[];
}

export interface FormattedNode {
  id: string;
  type: string;
  data: unknown;
  next?: string;
}

export interface ConditionNode extends FormattedNode {
  nextTrue?: string;
  nextFalse?: string;
}


