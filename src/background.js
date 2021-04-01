import { getConfig, setDarkTheme, setZenMode } from './utils/config';
import { sendApplyStyles, sendApplyStylesToAll } from './utils/messages';

console.log('start background');

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { method } = message;
  switch (method) {
    case 'getStyles':
      // todo get config from localhost and return it
      sendResponse({ done: true });
      return;
    default:
      break;
  }
});

browser.webNavigation.onCommitted.addListener(function (event) {
  console.log('onCommited', event);
  const url = new URL(event.url);
  if (url.host.endsWith('mediapart.fr')) {
    try {
      console.log('send applyStyles');
      sendApplyStyles(event.tabId);
    } catch (error) {
      console.log(error);
    }
  }
});

browser.commands.onCommand.addListener(async command => {
  switch (command) {
    case 'toggle-theme':
      const { darkTheme } = await getConfig();
      console.log({ command, darkTheme });
      await setDarkTheme(!darkTheme);
      sendApplyStylesToAll();
      break;
    case 'toggle-zen':
      const { zenMode } = await getConfig();
      await setZenMode(!zenMode);
      sendApplyStylesToAll();
      break;
    default:
      break;
  }
});
