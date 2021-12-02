import styles from '../generateCSS/styles.json';
import { getNameFromLink } from '../utils/helpers';

const DARK_THEME_STYLE_ELEMENT_CLASSNAME = 'mediapart-custom-theme';

const insertDarkTheme = () => {
  const elements = document.head.querySelectorAll('link[rel="stylesheet"]');
  elements.forEach(el => {
    const href = el.href;
    if (typeof href !== 'string') return;

    const name = getNameFromLink(href.split('?')[0]);
    const style = styles[name];
    if (!style) {
      if (process.env.NODE_ENV === 'development') {
        alert(href);
      }
      return;
    }
    const styleEl = document.createElement('style');
    styleEl.textContent = style;
    document.head.append(styleEl);
    styleEl.className = DARK_THEME_STYLE_ELEMENT_CLASSNAME;
  });
};

const removeDarkTheme = () => {
  const existingDarkThemeStyle = document.head.querySelectorAll(`.${DARK_THEME_STYLE_ELEMENT_CLASSNAME}`);
  existingDarkThemeStyle.forEach(el => {
    document.head.removeChild(el);
  });
};

export const applyDarkThemeConfig = darkTheme => {
  const existingDarkThemeStyle = document.head.getElementsByClassName(DARK_THEME_STYLE_ELEMENT_CLASSNAME);
  if (darkTheme === !!existingDarkThemeStyle.length) {
    // darkTheme is already set correctly
    return;
  }
  if (darkTheme) {
    insertDarkTheme();
  } else {
    removeDarkTheme();
  }
};
