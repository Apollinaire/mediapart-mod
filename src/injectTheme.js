import { getConfig } from './utils/config';
import { applyDarkThemeConfig } from './styles/darkTheme';

async function applyStyles() {
  const { darkTheme } = await getConfig();
  applyDarkThemeConfig(darkTheme);
}

chrome.runtime.sendMessage({ method: 'getStyles' }, applyStyles);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.method) {
    case 'applyStyles':
      applyStyles();
      sendResponse({ method: 'applyStyles', done: true });
      break;
    default:
      break;
  }
});
