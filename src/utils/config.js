export const DEFAULT_CONFIG = {
  zenMode: true,
  darkTheme: true,
  hotkeysActive: true,
  keySetting: [
    { key: 't', action: 'toggleDarkTheme', ctrl: false, alt: false, shift: false },
    { key: 'z', action: 'toggleZenMode' },
    { key: 'u', action: 'une' },
    { key: '+', action: 'increaseFontSize' },
    { key: '-', action: 'decreaseFontSize' },
  ],
};
export const CONFIG_KEYS = Object.keys(DEFAULT_CONFIG);

export const getConfig = (keys = CONFIG_KEYS) => {
  return new Promise(resolve => {
    chrome.storage.local.get(keys, config => {
      resolve({
        ...DEFAULT_CONFIG,
        ...config,
      });
    });
  });
};

export const setConfig = newConfig => {
  chrome.storage.local.set(newConfig);
};

export const setDarkTheme = newDarkTheme => {
  return new Promise(resolve => {
    chrome.storage.local.set({ darkTheme: newDarkTheme }, resolve);
  });
};
export const toggleDarkTheme = async () => {
  const { darkTheme } = await getConfig();
  return setDarkTheme(!darkTheme);
};

export const setZenMode = newZenMode => {
  return new Promise(resolve => {
    chrome.storage.local.set({ zenMode: newZenMode }, resolve);
  });
};
export const toggleZenMode = async () => {
  const { zenMode } = await getConfig();
  return setZenMode(!zenMode);
};

export const setHotkeysActive = newHotkeysActive => {
  return new Promise(resolve => {
    chrome.storage.local.set({ hotkeysActive: newHotkeysActive }, resolve);
  });
};
export const toggleHotkeysActive = async () => {
  const { hotkeysActive } = await getConfig();
  return setZenMode(!hotkeysActive);
};
