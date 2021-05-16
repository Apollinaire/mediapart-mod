import { articleLinksToFullPage } from './interactions/fullPage';
import { disableHotkeys, enableHotkeys } from './interactions/hotkeys';
import { getConfig } from './utils/config';

const run = async () => {
  const { hotkeysActive, fullPage } = await getConfig();

  // keyboard shortcuts
  if (hotkeysActive) {
    enableHotkeys()
  }

  // article links to full page
  if (fullPage) {
    articleLinksToFullPage()
  }

  // react to settings update
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.hotkeysActive) {
      if (changes.hotkeysActive.newValue === true) {
        enableHotkeys()
      }
      if (changes.hotkeysActive.newValue === false) {
        disableHotkeys()
      }
    }
    if (changes.fullPage) {
      if (changes.fullPage.newValue === true) {
        articleLinksToFullPage()
      }
      if (changes.fullPage.newValue === false) {
        window.location.reload()
      }
    }
  })

};

run();
