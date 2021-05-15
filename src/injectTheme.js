import { getConfig } from './utils/config';
import { applyDarkThemeConfig } from './styles/darkTheme';
import { applyZenModeConfig } from './styles/zenMode';

async function applyStyles() {
  if (document.head) {
    const { darkTheme, zenMode } = await getConfig();
    applyDarkThemeConfig(darkTheme);
    applyZenModeConfig(zenMode);
  } else {
    setTimeout(() => {
      applyStyles();
    }, 1);
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

applyStyles();
