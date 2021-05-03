import { getConfig } from './utils/config';
import { applyDarkThemeConfig } from './styles/darkTheme';

async function applyStyles() {
  const { darkTheme } = await getConfig();
  applyDarkThemeConfig(darkTheme);
}

chrome.storage.onChanged.addListener(changes => {
  if (changes.darkTheme) {
    applyDarkThemeConfig(changes.darkTheme.newValue);
  }
});

applyStyles();
