import getCss from "./getCSS";
import transformCss from "./transformCss";
import writeCssToLocal from "./writeCssToLocal";

const CSS = `

.a {
  color: red;
}
.a {
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
  rgb(100%,0%,20%);
}
.a {
  hsla(240 100% 50% / 5%);
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


`

export const generateCss = async () => {
  const css = await getCss();

  const newCss = transformCss(css);
  writeCssToLocal(newCss, "newMediapart.css")
  return;
};
generateCss();
