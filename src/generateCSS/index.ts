import { parse, toPlainObject } from 'css-tree';
import displayTree from './AstUtils/displayTree';
import getCss from './getCSS';
import transformCss from './transformCss';
import writeCssToLocal from './writeCssToLocal';

const CSS = `

.a {
  color: red;
  color: #eee;
}
.a {
  color: #eeeeee;
}
.a {
  color: rgb(1,1,1);
}
.a {
  color: hsl(18,18,18);
}
.a {
  color: hsla(18,18,18,0.5);
}
.a {
  color: rgba(1,1,1,0.2);
}
.a {
  color: rgb(100%,0%,20%);
}
.a {
  color: hsla(240 100% 50% / 5%);
}
.a {
  color: default;
}
.a {
  color: transparent;
}
.a {
  color: inherit;
}
.a {
  color: currentColor;
}


`;

const minimalCSS = `
.a > .b, .c {
  color: #eee;
}
`;

export const generateCss = async () => {
  // const css = await getCss();

  // displayTree(parse(CSS));
  const newCss = transformCss(CSS);
  console.log(newCss);
  // console.log(JSON.stringify(toPlainObject(parse(`.a > .b, .c {}`)), null, 2));
  // writeCssToLocal(newCss, "newMediapart.css");
  return;
};
generateCss();
