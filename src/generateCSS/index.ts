import getCss from "./getCSS";
import transformCss from "./transformCss";
import writeCssToLocal from "./writeCssToLocal";

export const generateCss = async () => {
  const css = await getCss();

  transformCss(css);

  return;
};
generateCss();
