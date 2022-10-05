import { getConfig } from './utils/config';
import { applyDarkThemeConfig } from './styles/darkTheme';
import { applyZenModeConfig } from './styles/zenMode';

async function applyStyles(delay = 0) {
  if (document.head) {
    const { darkTheme, zenMode } = await getConfig();
    const darkApplied = applyDarkThemeConfig(darkTheme);
    applyZenModeConfig(zenMode);

    if (!darkApplied) {
      // exponential delay
      setTimeout(() => {
        applyStyles(delay + 1);
      }, Math.pow(2, delay));
    }
  } else {
    setTimeout(() => {
      applyStyles(delay + 1);
    }, Math.pow(2, delay));
  }
}

chrome.storage.onChanged.addListener(changes => {
  if (changes.darkTheme) {
    applyDarkThemeConfig(changes.darkTheme.newValue);
  }
  if (changes.zenMode) {
    applyZenModeConfig(changes.zenMode.newValue);
  }
});

applyStyles(0);
