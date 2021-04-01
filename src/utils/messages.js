export const sendApplyStyles = tabId => {
  browser.tabs.sendMessage(tabId, { method: 'applyStyles' });
};

export const sendApplyStylesToAll = () => {
  browser.tabs.query({}, (tabs = []) => {
    tabs.forEach(tab => {
      sendApplyStyles(tab.id);
    });
  });
};
