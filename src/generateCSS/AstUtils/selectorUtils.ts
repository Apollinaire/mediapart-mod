import { types } from '@babel/core';
import {
  SelectorList,
  walk,
  parse,
  CssNode,
  Selector,
  generate,
  IdSelector,
  ClassSelector,
  TypeSelector,
  AttributeSelector,
  PseudoClassSelector,
  PseudoElementSelector,
  WhiteSpace,
  Combinator,
} from 'css-tree';
import hasType, { hasSameType } from './hasType';

export const getFakeStyleSheet = (selectorsList: string[]): string => selectorsList.join(', ') + '{}\n';

export const parseSelectors = (selectorsList: string[]): CssNode => {
  return parse(getFakeStyleSheet(selectorsList));
};

export const extractSelectors = (tree: CssNode): Selector[] => {
  let selectors: Selector[] = [];
  walk(tree, {
    visit: 'Selector',
    enter: node => {
      selectors.push(node);
    },
  });
  return selectors;
};

export const parseSelectorsList = (selectorsList: string[]): Selector[] =>
  extractSelectors(parseSelectors(selectorsList));

const isSameAttributeSelector = (attSelectorA: AttributeSelector, attSelectorB: AttributeSelector) => {
  let hasSameValue = false;
  if (attSelectorA.value === null && attSelectorB.value === null) {
    hasSameValue = true;
  } else if (attSelectorA.value?.type === 'String' && attSelectorB.value?.type === 'String') {
    hasSameValue = attSelectorA.value.value === attSelectorB.value.value;
  } else if (attSelectorA.value?.type === 'Identifier' && attSelectorB.value?.type === 'Identifier') {
    hasSameValue = attSelectorA.value.name === attSelectorB.value.name;
  }
  return (
    hasSameValue &&
    attSelectorA.name.name === attSelectorB.name.name &&
    attSelectorA.flags === attSelectorB.flags &&
    attSelectorA.matcher === attSelectorB.matcher
  );
};

export const isEqualSelectorChild = (selectorChildA: CssNode, selectorChildB: CssNode) => {
  if (!hasSameType(selectorChildA, selectorChildB)) {
    return false;
  }
  switch (selectorChildA.type) {
    case 'IdSelector':
      return selectorChildA.name === (selectorChildB as IdSelector).name;
    case 'ClassSelector':
      return selectorChildA.name === (selectorChildB as ClassSelector).name;
    case 'TypeSelector':
      return selectorChildA.name === (selectorChildB as TypeSelector).name;
    case 'AttributeSelector':
      return isSameAttributeSelector(selectorChildA, selectorChildB as AttributeSelector);
    case 'PseudoClassSelector':
    case 'PseudoElementSelector':
    case 'Combinator':
      return generate(selectorChildA) === generate(selectorChildB);
    case 'WhiteSpace':
      return true;
    default:
      return false;
  }
};

export const selectorIncludes = (selectorNode: Selector, valueNode: Selector): boolean => {
  const selector = selectorNode.children.toArray();
  const value = valueNode.children.toArray();
  if (value.length === 0) {
    return true;
  }
  let index = 0;
  for (let i = 0; i < selector.length; i++) {
    const node = selector[i];
    const valueNode = value[index];
    if (isEqualSelectorChild(node, valueNode)) {
      index++;
    }
    if (index >= value.length) {
      return true;
    }
  }

  return false;
};
