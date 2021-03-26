import { parse, walk, generate } from 'css-tree';
import displayTree from './AstUtils/displayTree';
import { handleDeclaration } from './AstUtils/invertColorNode';
import { selectorIncludes, parseSelectorsList } from './AstUtils/selectorUtils';

const config = {
  selectorBlackList: parseSelectorsList(['.footer', '.main-menu', '.menu-sticky', '.menu-wrapper']),
  propertyWhiteList: ['background-color', 'color', 'background', 'border', 'border-color', 'box-shadow', '-webkit-box-shadow'],
};

const transformCss = (css: string) => {
  const tree = parse(css);
  walk(tree, {
    visit: 'Rule',
    enter: (rule, ruleItem, ruleList) => {
      // remove selectors that match the blacklist
      if (rule.prelude.type === 'SelectorList') {
        walk(rule.prelude, {
          visit: 'Selector',
          enter: (selector, selectorItem, selectorList) => {
            for (const blackListedSelector of config.selectorBlackList) {
              if (selectorList && selectorItem && selectorIncludes(selector, blackListedSelector)) {
                try {
                  selectorList.remove(selectorItem);
                  break;
                } catch (error) {
                  console.log(generate(selector));
                  displayTree(rule);
                  throw error;
                }
              }
            }
          },
        });
        // if there are no more selectors inside the list, remove the whole rule
        if (ruleItem && ruleList && rule.prelude.children.getSize() === 0) {
          ruleList.remove(ruleItem);
          return;
        }
      }

      // remove the properties that don't match the whitelist
      walk(rule.block, {
        visit: 'Declaration',
        enter: (declaration, declarationItem, declarationList) => {
          if (!config.propertyWhiteList.includes(declaration.property)) {
            if (ruleItem && ruleList) {
              declarationList.remove(declarationItem);
            }
          } else {
            // modify the declaration
            handleDeclaration(declaration);
          }
        },
      });

      if (ruleItem && ruleList && rule.block.children.getSize() === 0) {
        ruleList.remove(ruleItem);
        return;
      }
    },
  });

  return generate(tree);
};

export default transformCss;
