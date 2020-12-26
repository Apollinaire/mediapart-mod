import newCSS from "./generateCSS/newMediapart.css";

function run() {
  const css = `
:root {
  --main-bg-color: #121212;
  --main-text-color: #eee;
}

body {
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}

`;

  const styleEl = document.createElement("style");
  styleEl.textContent = newCSS.toString() + css;
  document.body.append(styleEl);
}

run();
