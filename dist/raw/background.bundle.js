/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/utils/config.js
const CONFIG_KEYS = ['zenMode', 'darkTheme'];
const DEFAULT_CONFIG = {
  zenMode: true,
  darkTheme: true
};
const getConfig = () => {
  return new Promise(resolve => {
    chrome.storage.sync.get(CONFIG_KEYS, config => {
      resolve({ ...DEFAULT_CONFIG,
        ...config
      });
    });
  });
};
const setZenMode = newZenMode => {
  return new Promise(resolve => {
    chrome.storage.sync.set({
      zenMode: newZenMode
    }, resolve);
  });
};
const setDarkTheme = newDarkTheme => {
  return new Promise(resolve => {
    chrome.storage.sync.set({
      darkTheme: newDarkTheme
    }, resolve);
  });
};
;// CONCATENATED MODULE: ./src/utils/messages.js
const sendApplyStyles = tabId => {
  chrome.tabs.sendMessage(tabId, {
    method: 'applyStyles'
  });
};
const sendApplyStylesToAll = () => {
  chrome.tabs.query({}, (tabs = []) => {
    tabs.forEach(tab => {
      sendApplyStyles(tab.id);
    });
  });
};
;// CONCATENATED MODULE: ./src/background.js


console.log('start background');
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const {
    method
  } = message;

  switch (method) {
    case 'getStyles':
      // todo get config from localhost and return it
      sendResponse({
        done: true
      });
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
      sendApplyStyles(event.tabId);
    } catch (error) {
      console.log(error);
    }
  }
});
chrome.commands.onCommand.addListener(async command => {
  switch (command) {
    case 'toggle-theme':
      const {
        darkTheme
      } = await getConfig();
      console.log({
        command,
        darkTheme
      });
      await setDarkTheme(!darkTheme);
      sendApplyStylesToAll();
      break;

    case 'toggle-zen':
      const {
        zenMode
      } = await getConfig();
      await setZenMode(!zenMode);
      sendApplyStylesToAll();
      break;

    default:
      break;
  }
});
/******/ })()
;