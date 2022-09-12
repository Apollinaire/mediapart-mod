import { disableHotkeys, enableHotkeys } from './interactions/hotkeys';
import { getConfig } from './utils/config';

const run = async () => {
  const { hotkeysActive, keySetting } = await getConfig();

  // keyboard shortcuts
  if (hotkeysActive) {
    enableHotkeys(keySetting);
  }

  // react to settings update
  chrome.storage.onChanged.addListener(async changes => {
    if (changes.hotkeysActive) {
      if (changes.hotkeysActive.newValue === true) {
        disableHotkeys();
        const { keySetting } = await getConfig();
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
