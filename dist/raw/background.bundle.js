/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utils/config.js
const DEFAULT_CONFIG = {
  zenMode: true,
  darkTheme: true,
  hotkeysActive: true,
  keySetting: [{
    key: 't',
    action: 'toggleDarkTheme',
    ctrl: false,
    alt: false,
    shift: false
  }, {
    key: 'z',
    action: 'toggleZenMode'
  }, {
    key: 'u',
    action: 'une'
  }, {
    key: '+',
    action: 'increaseFontSize'
  }, {
    key: '-',
    action: 'decreaseFontSize'
  }]
};
const CONFIG_KEYS = Object.keys(DEFAULT_CONFIG);
const getConfig = (keys = CONFIG_KEYS) => {
  return new Promise(resolve => {
    chrome.storage.local.get(keys, config => {
      resolve({ ...DEFAULT_CONFIG,
        ...config
      });
    });
  });
};
const setConfig = newConfig => {
  chrome.storage.local.set(newConfig);
};
const setDarkTheme = newDarkTheme => {
  return new Promise(resolve => {
    chrome.storage.local.set({
      darkTheme: newDarkTheme
    }, resolve);
  });
};
const toggleDarkTheme = async () => {
  const {
    darkTheme
  } = await getConfig();
  return setDarkTheme(!darkTheme);
};
const setZenMode = newZenMode => {
  return new Promise(resolve => {
    chrome.storage.local.set({
      zenMode: newZenMode
    }, resolve);
  });
};
const toggleZenMode = async () => {
  const {
    zenMode
  } = await getConfig();
  return setZenMode(!zenMode);
};
const setHotkeysActive = newHotkeysActive => {
  return new Promise(resolve => {
    chrome.storage.local.set({
      hotkeysActive: newHotkeysActive
    }, resolve);
  });
};
const toggleHotkeysActive = async () => {
  const {
    hotkeysActive
  } = await getConfig();
  return setZenMode(!hotkeysActive);
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