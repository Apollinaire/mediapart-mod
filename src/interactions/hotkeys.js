import { toggleDarkTheme, toggleZenMode } from '../utils/config';

export const enableHotkeys = () => {
  document.addEventListener('keydown', onKeydown)
}

export const disableHotkeys = () => {
  document.removeEventListener('keydown', onKeydown)
}

const ignoredTagnames = ['input', 'textarea'];

export const onKeydown = e => {
  // ignore when we are inside an input
  const tagname = e.target.tagName.toLowerCase();
  if (ignoredTagnames.includes(tagname)) {
    return;
  }
  if (e.ctrlKey || e.altKey || e.shiftKey) {
    return;
  }
  handleKey(e.key);
};

const handleKey = key => {
  if (typeof keyMap[key] === 'function') {
    keyMap[key]();
  }
};

const keyMap = {
  // dark/light theme toggle
  t: toggleDarkTheme,
  // zen mode toggle
  z: toggleZenMode,
  // back to "la une"
  u: () => {
    const linkEl = document.querySelector('a.logo');
    linkEl?.click();
  },
  // next page
  o: () => {
    const linkEl = document.querySelector('ul.mini-pager li.next a');
    linkEl?.click();
  },
  // previous page
  i: () => {
    const linkEl = document.querySelector('ul.mini-pager li.previous a');
    linkEl?.click();
  },
  // full page read
  p: () => {
    const linkEl = document.querySelector('ul.sub-menu li.content-page-full a');
    linkEl.click();
  },
  // increase font-size
  '+': () => {
    const buttonEl = document.querySelector('ul.sub-menu li ul li button.increase-fs');
    if (!buttonEl.disabled) {
      buttonEl.click();
    }
  },
  // decrease font-size
  '-': () => {
    const buttonEl = document.querySelector('ul.sub-menu li ul li button.decrease-fs');
    if (!buttonEl.disabled) {
      buttonEl.click();
    }
  },
};
