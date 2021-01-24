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
} from 'css-tree';
import convert from 'color-convert';
import { ColorType, invertRGBColor } from '../colorUtils/invertRGBColor';
import { RGB } from 'color-convert/conversions';
import displayTree from './displayTree';

const getHexNode = (hex: string): Hash => ({
  type: 'Hash', // HACK: types are wrong
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
  const hasAlpha = typeof alpha === 'number';
  const children = new List<CssNode>();
  rgb.forEach((num, i) => {
    children.append(children.createItem(getNumberNode(num)));
    if (i < rgb.length - 1) {
      children.append(children.createItem(getCommaNode()));
    }
  });
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
      case 'border':
      case 'background':
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

const convertFunctionToRGB = (fn: FunctionNode): [rgb: RGB, alpha?: number] | [] => {
  if (fn.name === 'rgb' || fn.name === 'rgba') {
    let values: number[] = [];
    let alpha: number | undefined = undefined;
    walk(fn, {
      enter: (node: CssNode) => {
        if (node.type === 'Number') {
          if (values.length < 3) {
            values.push(parseFloat(node.value));
          } else if (typeof alpha === 'undefined') {
            alpha = parseFloat(node.value);
          } else {
            displayTree(fn);
            console.log({ values, alpha });
            throw Error('too much values in rgb function');
          }
        } else if (node.type === 'Percentage') {
          if (values.length < 3) {
            values.push(Math.round(2.55 * parseFloat(node.value)));
          } else if (typeof alpha === 'undefined') {
            alpha = parseFloat(node.value) / 100;
          } else {
            displayTree(fn);
            console.log({ values, alpha });
            throw Error('too much values in rgb function');
          }
        }
      },
    });
    if (values.length === 3) {
      return [values as RGB, alpha];
    } else {
      displayTree(fn);
      console.log(values);
      throw Error('invalid amount of rgb values');
    }
  } else if (fn.name === 'hsl' || fn.name === 'hsla') {
    let values: number[] = [];
    let alpha: number | undefined = undefined;

    // todo

    if (values.length === 3) {
      return [values as RGB, alpha];
    } else {
      displayTree(fn);
      console.log(values);
      throw Error('invalid amount of rgb values');
    }
  } else {
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
    case 'Hash':
      return getHexNode(convert.rgb.hex(invertRGBColor(convert.hex.rgb(node.value), colorType)));
    case 'Function':
      const [maybeRGB, maybeAlpha] = convertFunctionToRGB(node);
      if (maybeRGB) {
        const newRGB = invertRGBColor(maybeRGB, colorType);
        if (typeof maybeAlpha === 'number') {
        } else return getHexNode(convert.rgb.hex(newRGB));
      }
      return node;
    default:
      return node;
  }
}
