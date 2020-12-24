import { parse, findAll, find, generate, Declaration } from "css-tree";
import getDeclarationValue from "./AstUtils/getDeclarationValue";

const transformCss = (css: string) => {
  const tree = parse(css);
  const colorDeclarations = findAll(tree, (node, item, list) => {
    if (node.type === "Declaration" && node.property === "color") {
      return true;
    }
    return false;
  });
  const colors = (colorDeclarations as Declaration[]).map((node) =>
    generate(node.value)
  );
  console.log(colors);
};

export default transformCss;
