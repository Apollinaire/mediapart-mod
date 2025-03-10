import { parse, walk, generate } from 'css-tree';
import displayTree from './AstUtils/displayTree';
import { handleDeclaration } from './AstUtils/invertColorNode';
import { selectorIncludes, parseSelectorsList } from './AstUtils/selectorUtils';

// TODO: set config per file
const config = {
  selectorBlackList: parseSelectorsList([
    '._inverse',
    '.footer',
    '.main-menu',
    '.menu-sticky',
    '.menu-wrapper',
    '.cc-cookie-consent-banner-modal',
    '.mkt-banner--red',
    '.news__black-box',
    '.box._black',
    '.button._primary',
    '.button._club-primary',
    '.bt-specific',
    '.button._secondary-invert',
    '.is-secondary-invert',
    '.nav__menu-background',
    '.nav__search, .nav__primary, .nav__secondary, .nav__blog',
    '.nav__shortcuts',
    '.nav__burger .nav__title, .nav__burger .nav__icon, .nav__search .nav__title, .nav__search .nav__icon, .nav__primary .nav__title, .nav__primary .nav__icon',
    '.nav__blog a',
    '.nav__blog .nav__title:last-child',
    '.blogs-disclaimer-message__toggle',
  ]),
  propertyWhiteList: [
    'color',
    /^background/,
    /^border/,
    /^--/,
    'box-shadow',
    '-webkit-box-shadow',
  ],
  customCSS: /* CSS */ `
    .nav__main .mediapart-logo svg.mediapart-logo-text {
      filter: invert(1);
    }

    .club-logo svg .club-logo-title {
    filter: brightness(3);
    }

    :root {
      --main-bg-color: #292929;
      --main-text-color: #b5b5b5;
    }
    
    body {
      background-color: var(--main-bg-color);
      color: var(--main-text-color);
    }

    .news__body-wrapper {
      background-color: var(--main-bg-color);
    }

    .home.container.grid, .news__heading.grid, .news__body.grid {
      background-color: var(--main-bg-color);
    }

    svg.club-logo-title > path {
      fill: #90c4da;
    }

    svg.club-logo-subtitle > path {
      fill: #85BFD6;
    }

    html {
      --scrollbarBG: var(--main-bg-color);
      --thumbBG: #4d4d4d;
    }
    html {
      scrollbar-width: auto;
      scrollbar-color: var(--thumbBG) var(--scrollbarBG);
    }
    html::-webkit-scrollbar {
      height: 16px;
      background-color: var(--scrollbarBG);
    }
    html::-webkit-scrollbar-track {
      background-color: --scrollbarBG;
    }
    html::-webkit-scrollbar-thumb {
      background-color: var(--thumbBG) ;
      border: 3px solid var(--scrollbarBG);
    }
    .fixed .header {
      border-bottom: 1px solid #333333;
    }

    iframe {
      background-color: white;
    }

    input {
      background-color: var(--main-bg-color);
      color: var(--main-text-color);
      border-color: var(--main-text-color);
    }
    
  `,
};

const isWhitelisted = (property: string): boolean => {
  for (const propCheck of config.propertyWhiteList) {
    if (typeof propCheck === 'string' && propCheck === property) {
      return true;
    }
    if (propCheck instanceof RegExp && propCheck.test(property)) {
      return true;
    }
  }
  return false;
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
              if (
                selectorList &&
                selectorItem &&
                selectorIncludes(selector, blackListedSelector)
              ) {
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

      // modify properties that match the whitelist
      walk(rule.block, {
        visit: 'Declaration',
        enter: (declaration, declarationItem, declarationList) => {
          if (!isWhitelisted(declaration.property)) {
            if (ruleItem && ruleList) {
              declarationList.remove(declarationItem);
            }
          } else {
            // modify the declaration
            const toRemove = handleDeclaration(declaration);
            if (toRemove) {
              declarationList.remove(declarationItem);
            }
          }
        },
      });

      // if there are no more declarations inside a block, remove the rule
      if (ruleItem && ruleList && rule.block.children.getSize() === 0) {
        ruleList.remove(ruleItem);
        return;
      }
    },
  });

  walk(tree, {
    visit: 'Atrule',
    enter: (atRule, atRuleItem, atRuleList) => {
      if (
        atRuleList &&
        atRuleItem &&
        (atRule.block?.children.getSize() === 0 || atRule.name === 'font-face')
      ) {
        atRuleList.remove(atRuleItem);
        return;
      }
    },
  });

  return generate(tree) + config.customCSS;
};

export default transformCss;
