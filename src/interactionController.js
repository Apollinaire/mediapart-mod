import { articleLinksToFullPage } from './interactions/fullPage';
import { disableHotkeys, enableHotkeys } from './interactions/hotkeys';
import { getConfig } from './utils/config';

const run = async () => {
  const { hotkeysActive, fullPage, keySetting } = await getConfig();

  // keyboard shortcuts
  if (hotkeysActive) {
    enableHotkeys(keySetting);
  }

  // article links to full page
  if (fullPage) {
    articleLinksToFullPage();
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
    if (changes.fullPage) {
      if (changes.fullPage.newValue === true) {
        articleLinksToFullPage();
      }
      if (changes.fullPage.newValue === false) {
        window.location.reload();
      }
    }
  });
};

run();
