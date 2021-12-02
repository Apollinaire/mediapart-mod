import { cssLinks } from '../utils/constants';
import { getNameFromLink } from '../utils/helpers';
import getCss from './getCSS';
import transformCss from './transformCss';
import writeToJSON from './writeToJSON';

export const generateCss = async () => {
  const cssFiles = await Promise.all(
    cssLinks.map(async link => {
      const css = await getCss(link);
      const newCss = transformCss(css);
      const cssName = getNameFromLink(link);
      return [cssName, newCss];
    })
  );
  const cssFilesObj: Record<string, string> = {};
  cssFiles.forEach(([name, css]) => {
    cssFilesObj[name] = css;
  });

  writeToJSON(JSON.stringify(cssFilesObj));

  return;
};

generateCss();
