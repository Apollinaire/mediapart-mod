import { writable } from 'svelte/store';
import { getConfig, DEFAULT_CONFIG, CONFIG_KEYS, setConfig } from './config';

const createConfigStore = () => {
  const { set, subscribe, update } = writable({ ...DEFAULT_CONFIG, loading: true });

  // store init
  getConfig().then(config => {
    set({
      ...config,
      loading: false,
    });
  });

  // store reaction
  chrome.storage.onChanged.addListener(changes => {
    const newStore = {};
    CONFIG_KEYS.forEach(key => {
      if (changes[key]) {
        newStore[key] = changes[key].newValue;
      }
    });
    update(prev => ({
      ...prev,
      ...newStore,
      loading: false,
    }));
  });

  return {
    subscribe,
    set: args => {
      setConfig({ ...args, loading: true });
    },
  };
};

export const configStore = createConfigStore();
