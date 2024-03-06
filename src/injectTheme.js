import { getConfig } from './utils/config';
import { applyColorThemeConfig } from './styles/darkTheme';
import { applyZenModeConfig } from './styles/zenMode';
import { insertSideButtons } from './interactions/sideButtons';
import { exponentialDelay } from './utils/helpers';

async function applyStyles(delay = 0) {
  if (!document.head) {
    return false;
  }

  const { darkTheme, zenMode } = await getConfig();

  exponentialDelay(() => applyColorThemeConfig(darkTheme))();
  exponentialDelay(() => applyZenModeConfig(zenMode))();
  exponentialDelay(() => insertSideButtons(), 20)();

  return true;
}

chrome.storage.onChanged.addListener(changes => {
  if (changes.darkTheme) {
    applyColorThemeConfig(changes.darkTheme.newValue);
  }
  if (changes.zenMode) {
    applyZenModeConfig(changes.zenMode.newValue);
  }
});

const delayedApplyStyles = exponentialDelay(applyStyles);

delayedApplyStyles();
