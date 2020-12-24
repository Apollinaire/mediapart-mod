function run() {
  const css = `
:root {
  --main-bg-color: black;
}

body {
  background-color: var(--main-bg-color);
}

`;

  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.body.append(styleEl);
}

run();
