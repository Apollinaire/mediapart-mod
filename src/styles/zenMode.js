import zenModeCss from './zenModeStyle.less';

const ZEN_MODE_STYLE_ELEMENT_ID = 'mediapart-custom-zen-mode';

const insertZenMode = () => {
  const cssPrefix = `
    /*
      ZEN MODE Start 
    */
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = cssPrefix + zenModeCss.toString();
  styleEl.id = ZEN_MODE_STYLE_ELEMENT_ID;
  document.head.append(styleEl);
};

const removeZenMode = () => {
  const existingzenModeStyle = document.getElementById(ZEN_MODE_STYLE_ELEMENT_ID);
  document.head.removeChild(existingzenModeStyle);
};

export const applyZenModeConfig = zenMode => {
  const existingZenModeStyle = document.getElementById(ZEN_MODE_STYLE_ELEMENT_ID);
  if (zenMode === !!existingZenModeStyle) {
    // zenMode is already set correctly
    return;
  }
  if (zenMode) {
    insertZenMode();
  } else {
    removeZenMode();
  }
};
