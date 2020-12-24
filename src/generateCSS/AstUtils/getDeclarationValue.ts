import { Declaration, Value, Raw, CssNode, generate } from "css-tree";

const isRaw = (value: CssNode): value is Raw => value.type === "Raw";

const getStringValue = (value: Value | Raw): string => {
  let result: string = "";

  if (isRaw(value)) {
    return value.value;
  }

  

  return result;
};

const getDeclarationValue = (declaration: Declaration) => {
  return generate(declaration.value);
};

export default getDeclarationValue;
