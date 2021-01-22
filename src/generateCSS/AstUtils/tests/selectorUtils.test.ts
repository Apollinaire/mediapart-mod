import { selectorIncludes, parseSelectorsList } from '../selectorUtils';
import { generate } from 'css-tree';
describe('hasSelectorIntersection', () => {
  it('finds and intersection', () => {
    const [selector1, selector2] = parseSelectorsList(['.a .b .c', '.b .c']);
    expect(selectorIncludes(selector1, selector2)).toBe(true);
  });
  it('finds no intersection when there is none', () => {
    const [selector1, selector2] = parseSelectorsList(['.a .b .c', '.b .c']);
    expect(selectorIncludes(selector2, selector1)).toBe(false);
  });
});
