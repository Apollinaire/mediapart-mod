import { CssNode, HexColor, Identifier } from "css-tree";
import convert from "color-convert";
import { invertRGBColor } from "../colorUtils/invertRGBColor";

const getHexNode = (hex: string): HexColor => ({
  type: "Hash" as "HexColor", // HACK: types are wrong
  value: hex,
});

export function invertColorNode(node: CssNode): CssNode {
  switch (node.type) {
    case "Identifier":
      const rgb = convert.keyword.rgb((node as any).name);
      if (!rgb) {
        // means it's transparent, default, inherit, currentColor
        return node;
      } else {
        // means it's blue, red etc
        return getHexNode(convert.rgb.hex(invertRGBColor(...rgb)));
      }
    case "Hash" as "HexColor": // HACK: types are wrong
      return getHexNode(
        convert.rgb.hex(invertRGBColor(...convert.hex.rgb((node as HexColor).value)))
      );
    case "Function":
        //todo
    default:
      return node;
  }
}
