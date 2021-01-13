console.log('start background');

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
