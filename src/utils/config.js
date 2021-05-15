const CONFIG_KEYS = ['zenMode', 'darkTheme'];
const DEFAULT_CONFIG = {
  zenMode: true,
  darkTheme: true,
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

export const setZenMode = newZenMode => {
  return new Promise(resolve => {
    chrome.storage.local.set({ zenMode: newZenMode }, resolve);
  });
};

export const setDarkTheme = newDarkTheme => {
  return new Promise(resolve => {
    chrome.storage.local.set({ darkTheme: newDarkTheme }, resolve);
  });
};

export const toggleDarkTheme = async () => {
  const { darkTheme } = await getConfig()
  return setDarkTheme(!darkTheme)
}

export const toggleZenMode = async () => {
  const { zenMode } = await getConfig()
  return setZenMode(!zenMode)
}