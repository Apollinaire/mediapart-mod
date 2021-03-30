console.log('start background');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
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

chrome.webNavigation.onCommitted.addListener(function (event) {
  console.log('onCommited', event);
  const url = new URL(event.url);
  if (url.host.endsWith('mediapart.fr')) {
    try {
      console.log('send applyStyles');
      chrome.tabs.sendMessage(event.tabId, { method: 'applyStyles' });
    } catch (error) {
      console.log(error);
    }
  }
});
