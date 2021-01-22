import { CssNode, Declaration, HexColor, Identifier, FunctionNode, List, Value } from 'css-tree';
import convert from 'color-convert';
import { ColorType, invertRGBColor } from '../colorUtils/invertRGBColor';
import { RGB } from 'color-convert/conversions';

const getHexNode = (hex: string): HexColor => ({
  type: 'Hash' as 'HexColor', // HACK: types are wrong
  value: hex,
});

const getRGBFunctionNode = (rgb: RGB, alpha?: number): FunctionNode => {
  const hasAlpha = typeof alpha === 'number';
  const children = new List<Value>();
  return {
    type: 'Function',
    name: hasAlpha ? 'rgba' : 'rgb',
    children,
  };
};

export const handleDeclaration = (declaration: Declaration) => {
  if (declaration.value.type === 'Value') {
    switch (declaration.property) {
      case 'background-color':
      case 'border-color':
        declaration.value.children = declaration.value.children.map(value => invertColorNode(value, 'background'));
        break;
      case 'background':
      case 'border':
        console.log(declaration.value.children);
        break;
      case 'color':
        declaration.value.children = declaration.value.children.map(value => invertColorNode(value, 'text'));
        break;
      default:
        break;
    }
  } else {
    console.log('unhandled raw value:', declaration.value.value);
  }
};

const convertFunctionToRGB = (fn: FunctionNode): [rbg: RGB, alpha?: number] | [] => {
  switch (fn.name) {
    case 'hsl':
    case 'hsla':
    case 'rgb':
    case 'rgba':
      console.log(fn.name, fn.children.toArray());
    default:
      return [];
  }
};

export function invertColorNode(node: CssNode, colorType: ColorType): CssNode {
  switch (node.type) {
    case 'Identifier':
      const rgb = convert.keyword.rgb((node as any).name);
      if (!rgb) {
        // means it's transparent, default, inherit, currentColor
        return node;
      } else {
        // means it's blue, red etc
        return getHexNode(convert.rgb.hex(invertRGBColor(rgb, colorType)));
      }
    case 'Hash' as 'HexColor': // HACK: types are wrong
      return getHexNode(convert.rgb.hex(invertRGBColor(convert.hex.rgb((node as HexColor).value), colorType)));
    case 'Function':
      const [maybeRGB, maybeAlpha] = convertFunctionToRGB(node);
      if (maybeRGB) {
        const newRGB = invertRGBColor(maybeRGB, colorType);
        if (typeof maybeAlpha === 'number') {
        }
      }
      return node;
    default:
      return node;
  }
}
