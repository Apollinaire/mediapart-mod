import { CssNode, generate, walk } from 'css-tree';

const deep = '│   ';
const last = '│── ';

const getTreeLine = (text: string, depth: number) => {
  let prefix = '';
  for (let index = 0; index <= depth; index++) {
    prefix += index === depth ? last : deep;
  }
  return prefix + text;
};

const getNodeValue = (node: CssNode) => {
  switch (node.type) {
    case 'SelectorList':
    case 'Selector':
    case 'Value':
    case 'Raw':
    case 'Number':
    case 'Operator':
      return generate(node);
    case 'Declaration':
      return node.property;
    case 'Function':
      return node.name;
    default:
      return '';
  }
};

const printLine = (node: CssNode, depth: number) => {
  const nodeValue = getNodeValue(node);
  let value = node.type;
  if (nodeValue) {
    value += ` "${nodeValue}"`;
  }

  console.log(getTreeLine(value, depth));
};

const displayTree = (tree: CssNode) => {
  let depth = -1;

  walk(tree, {
    enter: (node: CssNode) => {
      depth++;
      printLine(node, depth);
    },
    leave: () => {
      depth--;
    },
  });
};

export default displayTree;
