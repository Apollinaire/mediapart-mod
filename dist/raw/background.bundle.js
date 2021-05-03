/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utils/config.js
const CONFIG_KEYS = ['zenMode', 'darkTheme'];
const DEFAULT_CONFIG = {
  zenMode: true,
  darkTheme: true
};
const getConfig = () => {
  return new Promise(resolve => {
    chrome.storage.local.get(CONFIG_KEYS, config => {
      resolve({ ...DEFAULT_CONFIG,
        ...config
      });
    });
  });
};
const setZenMode = newZenMode => {
  return new Promise(resolve => {
    chrome.storage.local.set({
      zenMode: newZenMode
    }, resolve);
  });
};
const setDarkTheme = newDarkTheme => {
  return new Promise(resolve => {
    chrome.storage.local.set({
      darkTheme: newDarkTheme
    }, resolve);
  });
};
;// CONCATENATED MODULE: ./src/background.js

console.log('start background');
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
      break;

    case 'toggle-zen':
      const {
        zenMode
      } = await getConfig();
      await setZenMode(!zenMode);
      break;

    default:
      break;
  }
});
/******/ })()
;