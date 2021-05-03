import { getConfig } from './utils/config';
import { applyDarkThemeConfig } from './styles/darkTheme';

async function applyStyles() {
  if (document.head) {
    const { darkTheme } = await getConfig();
    applyDarkThemeConfig(darkTheme);
  } else {
    setTimeout(() => {
      applyStyles()
    }, 1);
  }
}

chrome.storage.onChanged.addListener(changes => {
  if (changes.darkTheme) {
    applyDarkThemeConfig(changes.darkTheme.newValue);
  }
});

applyStyles();
