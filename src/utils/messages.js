export const sendApplyStyles = tabId => {
  chrome.tabs.sendMessage(tabId, { method: 'applyStyles' });
};

export const sendApplyStylesToAll = () => {
  chrome.tabs.query({}, (tabs = []) => {
    tabs.forEach(tab => {
      sendApplyStyles(tab.id);
    });
  });
};
