import newCSS from './generateCSS/newMediapart.css';

function run() {
  const cssPrefix = `
    /*
      THEME Start 
    */
  `;

  const cssSuffix = `
:root {
  --main-bg-color: #121212;
  --main-text-color: #eee;
}

body {
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}

`;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssPrefix + newCSS.toString() + cssSuffix;
  styleEl.id = 'mediapart-custom-theme';
  console.log(newCSS.toString().length);
  document.head.append(styleEl);
}

run();
