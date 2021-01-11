chrome.webNavigation.onCommitted.addListener(function (o) {
  console.log('inejct');
  chrome.tabs.executeScript(o.tabId, {
    file: 'content.bundle.js',
    runAt: 'document_start',
    allFrames: true,
  });
});
