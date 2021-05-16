const CONFIG_KEYS = ['zenMode', 'darkTheme'];
const DEFAULT_CONFIG = {
  zenMode: true,
  darkTheme: true,
  fullPage: true,
  hotkeysActive: true,
};

export const getConfig = () => {
  return new Promise(resolve => {
    chrome.storage.local.get(CONFIG_KEYS, config => {
      resolve({
        ...DEFAULT_CONFIG,
        ...config,
      });
    });
  });
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

export const setFullPage = newFullPage => {
  return new Promise(resolve => {
    chrome.storage.local.set({ fullPage: newFullPage }, resolve);
  });
};
export const toggleZenMode = async () => {
  const { fullPage } = await getConfig();
  return setFullPage(!fullPage);
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
