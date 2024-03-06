import { toggleDarkTheme, toggleZenMode } from '../utils/config';

let keySetting = [];

export const enableHotkeys = newKeySetting => {
  keySetting = newKeySetting;
  document.addEventListener('keydown', onKeydown);
};

export const disableHotkeys = () => {
  document.removeEventListener('keydown', onKeydown);
};

const ignoredTagnames = ['input', 'textarea'];

let onKeydown = e => {
  // ignore when we are inside an input
  const tagname = e.target.tagName.toLowerCase();
  if (ignoredTagnames.includes(tagname)) {
    return;
  }
  handleKey(e.key, { alt: !!e.altKey, ctrl: !!e.ctrlKey, shift: !!e.shiftKey }, e);
};

const handleKey = (keyChar, { alt: altMod, ctrl: ctrlMod, shift: shiftMod }, e) => {
  const { action } =
    keySetting.find(
      ({ key, alt, ctrl, shift }) =>
        key.toLowerCase() === keyChar.toLowerCase() &&
        !!alt === altMod &&
        !!ctrl === ctrlMod &&
        !!shift === shiftMod
    ) ?? {};
  if (action) {
    e.preventDefault();
    e.stopPropagation();
    actions[action].run();
  }
};

export const actions = {
  // dark/light theme toggle
  toggleDarkTheme: {
    label: 'Activer/désactiver le thème sombre',
    run: toggleDarkTheme,
  },
  // zen mode toggle
  toggleZenMode: {
    label: 'Activer/désactiver le mode zen',
    run: toggleZenMode,
  },
  // back to "la une"
  une: {
    label: 'Retour à la une',
    run: () => {
      const linkEl =
        document.querySelector('[data-smarttag-name="retour_journal"]') ||
        document.querySelector('[href="/"]');
      console.log(linkEl);
      linkEl?.click();
    },
  },
  // increase font-size
  increaseFontSize: {
    label: 'Augmenter la taille de police',
    run: () => {
      const buttonEl =
        document.querySelector('[data-js-fontsize-increase]') ||
        document.getElementById('js-fontsize-increase') ||
        document.querySelector('ul.sub-menu li ul li button.increase-fs');
      if (buttonEl && !buttonEl.disabled) {
        buttonEl.click();
      }
    },
  },
  // decrease font-size
  decreaseFontSize: {
    label: 'Diminuer la taille de police',
    run: () => {
      const buttonEl =
        document.querySelector('[data-js-fontsize-decrease]') ||
        document.getElementById('js-fontsize-decrease') ||
        document.querySelector('ul.sub-menu li ul li button.decrease-fs');
      if (buttonEl && !buttonEl.disabled) {
        buttonEl.click();
      }
    },
  },
};
