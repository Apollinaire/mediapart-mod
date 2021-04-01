import getCss from './getCSS';
import transformCss from './transformCss';
import writeCssToLocal from './writeCssToLocal';

export const generateCss = async () => {
  const css = await getCss();
  const newCss = transformCss(css);
  writeCssToLocal(newCss, 'newMediapart.css');
  return;
};

generateCss();
