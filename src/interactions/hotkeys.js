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
  const { action } = keySetting.find(
    ({ key, alt, ctrl, shift }) => key === keyChar && !!alt === altMod && !!ctrl === ctrlMod && !!shift === shiftMod
  );
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
      const linkEl = document.querySelector('a.logo');
      linkEl?.click();
    },
  },
  // next page
  nextPage: {
    label: 'Page suivante',
    run: () => {
      const linkEl = document.querySelector('ul.mini-pager li.next a');
      linkEl?.click();
    },
  },
  // previous page
  previousPage: {
    label: 'Page précédente',
    run: () => {
      const linkEl = document.querySelector('ul.mini-pager li.previous a');
      linkEl?.click();
    },
  },
  // full page read
  fullPage: {
    label: 'Lecture sur une page',
    run: () => {
      const linkEl = document.querySelector('ul.sub-menu li.content-page-full a');
      linkEl.click();
    },
  },
  // increase font-size
  increaseFontSize: {
    label: 'Augmenter la taille de police',
    run: () => {
      const buttonEl = document.querySelector('ul.sub-menu li ul li button.increase-fs');
      if (!buttonEl.disabled) {
        buttonEl.click();
      }
    },
  },
  // decrease font-size
  decreaseFontSize: {
    label: 'Diminuer la taille de police',
    run: () => {
      const buttonEl = document.querySelector('ul.sub-menu li ul li button.decrease-fs');
      if (!buttonEl.disabled) {
        buttonEl.click();
      }
    },
  },
};
