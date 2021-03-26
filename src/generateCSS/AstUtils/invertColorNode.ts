import {
  CssNode,
  Declaration,
  Hash,
  Identifier,
  FunctionNode,
  List,
  Value,
  walk,
  NumberNode,
  Percentage,
  Operator,
  generate,
} from 'css-tree';
import convert from 'color-convert';
import { ColorType, invertRGBColor } from '../colorUtils/invertRGBColor';
import { HSLModel, RGBModel } from '../colorUtils/colorModels';
import { RGB } from 'color-convert/conversions';
import displayTree from './displayTree';

const getHexNode = (hex: string): Hash => ({
  type: 'Hash',
  value: hex,
});
const getNumberNode = (num: number): NumberNode => ({
  type: 'Number',
  value: num.toString(),
});
const getPercentageNode = (num: number): Percentage => ({
  type: 'Percentage',
  value: num.toString(),
});
const getCommaNode = (): Operator => ({
  type: 'Operator',
  value: ',',
});

const getRGBFunctionNode = (rgb: RGB, alpha?: number): FunctionNode => {
  const children = new List<CssNode>();
  rgb.forEach((num, i) => {
    children.append(children.createItem(getNumberNode(num)));
    if (i < rgb.length - 1) {
      children.append(children.createItem(getCommaNode()));
    }
  });
  if (typeof alpha === 'number') {
    children.append(children.createItem(getCommaNode()));
    children.append(children.createItem(getNumberNode(alpha)));
  }
  return {
    type: 'Function',
    name: typeof alpha === 'number' ? 'rgba' : 'rgb',
    children,
  };
};

export const handleDeclaration = (declaration: Declaration) => {
  if (declaration.value.type === 'Value') {
    switch (declaration.property) {
      case 'background-color':
      case 'border-color':
      case 'border':
      case 'background':
      case 'box-shadow':
      case '-webkit-bow-shadow':
        declaration.value.children = declaration.value.children.map(value => invertColorNode(value, 'background'));
        break;
      // displayTree(declaration );
      // break;
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

const convertFunctionToRGB = (fn: FunctionNode): [rgb: RGB, alpha: number | null] | [] => {
  try {
    if (fn.name === 'rgb' || fn.name === 'rgba') {
      const rgb = new RGBModel();
      walk(fn, {
        enter: (node: CssNode) => {
          if (node.type === 'Number' || node.type === 'Percentage') {
            rgb.push(node.value, node.type);
          }
        },
      });
      return rgb.toValues();
    } else if (fn.name === 'hsl' || fn.name === 'hsla') {
      const hsl = new HSLModel();
      walk(fn, {
        enter: (node: CssNode) => {
          if (node.type === 'Percentage' || node.type === 'Number' || node.type === 'Dimension') {
            hsl.push(node.value, node.type);
          }
        },
      });
      return hsl.toValues();
    } else {
      return [];
    }
  } catch (error) {
    console.log(generate(fn));
    displayTree(fn);
    throw error;
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
    case 'Hash':
      return getHexNode(convert.rgb.hex(invertRGBColor(convert.hex.rgb(node.value), colorType)));
    case 'Function':
      const [maybeRGB, maybeAlpha] = convertFunctionToRGB(node);
      if (maybeRGB) {
        const newRGB = invertRGBColor(maybeRGB, colorType);
        if (typeof maybeAlpha === 'number') {
          return getRGBFunctionNode(newRGB, maybeAlpha);
        } else {
          return getHexNode(convert.rgb.hex(newRGB));
        }
      }
      return node;
    default:
      return node;
  }
}
