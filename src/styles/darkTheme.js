import newCSS from '../generateCSS/newMediapart.css';

const DARK_THEME_STYLE_ELEMENT_ID = 'mediapart-custom-theme';

const insertDarkTheme = () => {
  const cssPrefix = `
    /*
      THEME Start 
    */
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssPrefix + newCSS.toString();
  styleEl.id = DARK_THEME_STYLE_ELEMENT_ID;
  document.head.append(styleEl);
};

const removeDarkTheme = () => {
  const existingDarkThemeStyle = document.getElementById(DARK_THEME_STYLE_ELEMENT_ID);
  document.head.removeChild(existingDarkThemeStyle);
};

export const applyDarkThemeConfig = darkTheme => {
  const existingDarkThemeStyle = document.getElementById(DARK_THEME_STYLE_ELEMENT_ID);
  if (darkTheme === !!existingDarkThemeStyle) {
    // darkTheme is already set correctly
    return;
  }
  if (darkTheme) {
    insertDarkTheme();
  } else {
    removeDarkTheme();
  }
};
