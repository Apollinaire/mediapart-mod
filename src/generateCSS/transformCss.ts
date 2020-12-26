import {
  parse,
  walk,
  findAll,
  find,
  generate,
  Declaration,
  Value,
} from "css-tree";
import _ from "lodash";
import { invertColorNode } from "./AstUtils/invertColorNode";

const transformCss = (css: string) => {
  const tree = parse(css);
  // const colorDeclarations = findAll(tree, (node, item, list) => {
  //   if (node.type === "Declaration" && node.property === "color") {
  //     return true;
  //   }
  //   return false;
  // });
  // const colors = (colorDeclarations as Declaration[]).map((node) => {
  //   if (node.value.type === "Value" && node.value.children) {
  //     const firstNode = node.value.children.first();
  //     if (firstNode?.type === "Hash" as "HexColor") {
  //       return firstNode.value
  //     }
  //   }
  // });
  // console.log(colors);
  walk(tree, {
    visit: "Declaration",
    enter: (node) => {
      if (
        (node.property === "color" || node.property === "background-color") &&
        node.value.type === "Value"
      ) {
        node.value.children = node.value.children.map(invertColorNode);
      }
    },
  });

  return generate(tree);
};

export default transformCss;
