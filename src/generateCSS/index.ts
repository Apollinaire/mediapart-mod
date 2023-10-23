import { cssLinks } from '../utils/constants';
import { getNameFromLink } from '../utils/helpers';
import getFile, { getMainCssLink } from './getCSS';
import transformCss from './transformCss';
import writeToJSON from './writeToJSON';

export const generateCss = async () => {
  const mainCssLink = await getMainCssLink()
  
  const allLinks = [mainCssLink, ...cssLinks]

  const cssFiles = await Promise.all(
    allLinks.map(async link => {
      const css = await getFile(link);
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
