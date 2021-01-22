import { CssNode } from 'css-tree';

const hasType = (node: CssNode, type: CssNode['type'] | 'Hash') => node.type === type;

export const hasSameType = <T extends CssNode>(nodeA: T, nodeB: CssNode): nodeB is T => {
  return hasType(nodeB, nodeA.type);
};

export default hasType;
