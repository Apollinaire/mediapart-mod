import { parse, walk, generate } from 'css-tree';
import displayTree from './AstUtils/displayTree';
import { handleDeclaration } from './AstUtils/invertColorNode';
import { selectorIncludes, parseSelectorsList } from './AstUtils/selectorUtils';

const config = {
  selectorBlackList: parseSelectorsList(['.footer', '.main-menu', '.menu-sticky', '.menu-wrapper']),
  propertyWhiteList: [
    'background-color',
    'color',
    'background',
    'border',
    'border-color',
    'box-shadow',
    '-webkit-box-shadow',
  ],
  customCSS: /* CSS */ `
    a.logo img.brand {
      filter: invert(1);
    }

    :root {
      --main-bg-color: #121212;
      --main-text-color: #eee;
    }
    
    body {
      background-color: var(--main-bg-color);
      color: var(--main-text-color);
    }

    html {
      --scrollbarBG: #121212;
      --thumbBG: #4d4d4d;
    }
    html {
      scrollbar-width: auto;
      scrollbar-color: var(--thumbBG) var(--scrollbarBG);
    }
    html::-webkit-scrollbar {
      height: 16px;
    }
    html::-webkit-scrollbar-track {
      background-color: --scrollbarBG;
    }
    html::-webkit-scrollbar-thumb {
      background-color: var(--thumbBG) ;
      border: 3px solid var(--scrollbarBG);
    }
    div {
      color: #dfdfdf;
    }
    
  `,
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

  return generate(tree) + config.customCSS;
};

export default transformCss;
