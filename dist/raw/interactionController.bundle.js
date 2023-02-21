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
;// CONCATENATED MODULE: ./src/interactions/hotkeys.js

let keySetting = [];
const enableHotkeys = newKeySetting => {
  keySetting = newKeySetting;
  document.addEventListener('keydown', onKeydown);
};
const disableHotkeys = () => {
  document.removeEventListener('keydown', onKeydown);
};
const ignoredTagnames = ['input', 'textarea'];

let onKeydown = e => {
  // ignore when we are inside an input
  const tagname = e.target.tagName.toLowerCase();

  if (ignoredTagnames.includes(tagname)) {
    return;
  }

  handleKey(e.key, {
    alt: !!e.altKey,
    ctrl: !!e.ctrlKey,
    shift: !!e.shiftKey
  }, e);
};

const handleKey = (keyChar, {
  alt: altMod,
  ctrl: ctrlMod,
  shift: shiftMod
}, e) => {
  const {
    action
  } = keySetting.find(({
    key,
    alt,
    ctrl,
    shift
  }) => key.toLowerCase() === keyChar.toLowerCase() && !!alt === altMod && !!ctrl === ctrlMod && !!shift === shiftMod) ?? {};

  if (action) {
    e.preventDefault();
    e.stopPropagation();
    actions[action].run();
  }
};

const actions = {
  // dark/light theme toggle
  toggleDarkTheme: {
    label: 'Activer/désactiver le thème sombre',
    run: toggleDarkTheme
  },
  // zen mode toggle
  toggleZenMode: {
    label: 'Activer/désactiver le mode zen',
    run: toggleZenMode
  },
  // back to "la une"
  une: {
    label: 'Retour à la une',
    run: () => {
      const linkEl = document.querySelector('[data-smarttag-name="retour_journal"]') || document.querySelector('[href="/"]');
      console.log(linkEl);
      linkEl === null || linkEl === void 0 ? void 0 : linkEl.click();
    }
  },
  // increase font-size
  increaseFontSize: {
    label: 'Augmenter la taille de police',
    run: () => {
      const buttonEl = document.querySelector('[data-js-fontsize-increase]') || document.getElementById('js-fontsize-increase') || document.querySelector('ul.sub-menu li ul li button.increase-fs');

      if (buttonEl && !buttonEl.disabled) {
        buttonEl.click();
      }
    }
  },
  // decrease font-size
  decreaseFontSize: {
    label: 'Diminuer la taille de police',
    run: () => {
      const buttonEl = document.querySelector('[data-js-fontsize-decrease]') || document.getElementById('js-fontsize-decrease') || document.querySelector('ul.sub-menu li ul li button.decrease-fs');

      if (buttonEl && !buttonEl.disabled) {
        buttonEl.click();
      }
    }
  }
};
;// CONCATENATED MODULE: ./src/interactionController.js



const run = async () => {
  const {
    hotkeysActive,
    keySetting
  } = await getConfig(); // keyboard shortcuts

  if (hotkeysActive) {
    enableHotkeys(keySetting);
  } // react to settings update


  chrome.storage.onChanged.addListener(async changes => {
    if (changes.hotkeysActive) {
      if (changes.hotkeysActive.newValue === true) {
        disableHotkeys();
        const {
          keySetting
        } = await getConfig();
        enableHotkeys(keySetting);
      }

      if (changes.hotkeysActive.newValue === false) {
        disableHotkeys();
      }
    }

    if (changes.keySetting) {
      disableHotkeys();
      enableHotkeys(changes.keySetting.newValue);
    }
  });
};

run();
/******/ })()
;