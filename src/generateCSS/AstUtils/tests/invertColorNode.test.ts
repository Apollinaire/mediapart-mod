import { parse, walk, generate } from 'css-tree';
import { invertColorNode, scaleSingleDigitHex } from '../invertColorNode';

describe('invertColorNode', () => {
  const declarationStr = `background: linear-gradient(0deg,#fff 0,#ffffffe6 16px,#fff0)`;
  const tree = parse(`.test {${declarationStr};}`);

  it('should keep alpha values in functions', () => {
    walk(tree, {
      visit: 'Declaration',
      enter: (declaration, declarationItem, declarationList) => {
        if (declaration.value.type === 'Value') {
          declaration.value.children = declaration.value.children.map(value =>
            invertColorNode(value, 'background')
          );
          expect(generate(declaration)).toEqual(
            'background:linear-gradient(0deg,#292929 0,#292929e6 16px,#29292900)'
          );
        }
      },
    });
  });
});
