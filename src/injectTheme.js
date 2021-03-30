import newCSS from './generateCSS/newMediapart.css';
// console.log('start extension', Date.now());

const DARK_THEME_STYLE_EL_ID = 'mediapart-custom-theme';

function applyStyles() {
  const existingStyleEl = document.getElementById(DARK_THEME_STYLE_EL_ID);
  if (existingStyleEl !== null) {
    return;
  }
  const cssPrefix = `
    /*
      THEME Start 
    */
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssPrefix + newCSS.toString();
  styleEl.id = DARK_THEME_STYLE_EL_ID;
  // console.log(newCSS.toString().length);
  document.head.append(styleEl);
}

chrome.runtime.sendMessage({ method: 'getStyles' }, applyStyles);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log(message, sender);
  switch (message.method) {
    case 'applyStyles':
      applyStyles();
      sendResponse({ method: 'applyStyles', done: true });
      break;
    default:
      // console.log('unhandled message method: ', message.method, message);
      break;
  }
});
