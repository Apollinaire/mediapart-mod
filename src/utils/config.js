const CONFIG_KEYS = ['zenMode', 'darkTheme'];
const DEFAULT_CONFIG = {
  zenMode: true,
  darkTheme: true,
};

export const getConfig = () => {
  return new Promise(resolve => {
    chrome.storage.sync.get(CONFIG_KEYS, config => {
      resolve({
        ...DEFAULT_CONFIG,
        ...config,
      });
    });
  });
};

export const setZenMode = newZenMode => {
  return new Promise(resolve => {
    chrome.storage.sync.set({ zenMode: newZenMode }, resolve);
  });
};

export const setDarkTheme = newDarkTheme => {
  return new Promise(resolve => {
    chrome.storage.sync.set({ darkTheme: newDarkTheme }, resolve);
  });
};
