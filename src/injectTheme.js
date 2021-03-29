import newCSS from './generateCSS/newMediapart.css';
console.log('start extension', Date.now());

function applyStyles() {
  const cssPrefix = `
    /*
      THEME Start 
    */
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssPrefix + newCSS.toString();
  styleEl.id = 'mediapart-custom-theme';
  console.log(newCSS.toString().length);
  document.head.append(styleEl);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, sender);
  switch (message.method) {
    case 'applyStyles':
      applyStyles();
      sendResponse({ method: 'applyStyles', done: true });
      break;
    default:
      console.log('unhandled message method: ', message.method, message);
  }
});
