import ConditionNode from "../features/nodes/ConditionNode";
import EmailNode from "../features/nodes/EmailNode";
import ResultNode from "../features/nodes/ResultNode";
import StartNode from "../features/nodes/StartNode";
import WaitNode from "../features/nodes/WaitNode";

export const nodeTypes = {
  'start': StartNode,
  'email': EmailNode,
  'wait': WaitNode,
  'condition': ConditionNode,
  'result': ResultNode,
  'resultTrue': ResultNode,
  'resultFalse': ResultNode,
};
