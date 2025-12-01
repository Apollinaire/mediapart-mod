import { toggleDarkTheme, toggleZenMode } from '../utils/config';
import { isArticleLink } from './fullPage';

export const insertSideButtons = () => {
  if (!isArticleLink(window.location.toString())) {
    return true;
  }

  const engagementBar = document.querySelector('ul[data-js="engagement-bar"]');

  if (!engagementBar) {
    return false;
  }

  const themeBtn = createButton({
    tooltip: 'Mode jour/nuit',
    innerHTML: colorSVG,
    onclick: toggleDarkTheme,
  });
  const zenBtn = createButton({
    tooltip: 'Lecture zen',
    innerHTML: zenSVG,
    onclick: toggleZenMode,
  });

  engagementBar.appendChild(themeBtn);
  engagementBar.appendChild(zenBtn);

  return true;
};

const createButton = ({ tooltip, innerHTML, onclick }) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerHTML = innerHTML + `<span class='screen-reader-only'>${tooltip}</span>`;
  btn.onclick = e => {
    onclick();
    e.target.blur();
  };
  btn.setAttribute('data-tooltip', tooltip);
  btn.setAttribute('aria-abel', tooltip);
  btn.setAttribute('data-smarttag', true);
  btn.setAttribute('data-smarttag-type', 'action')
  btn.setAttribute('data-smarttag-name', tooltip)
  btn.setAttribute('data-smarttag-chapter3', 'sticky_gauche')

  const li = document.createElement('li')
  li.appendChild(btn)

  return li;
};

const colorSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="icon _lg" aria-hidden="true" focusable="false" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
</svg>
`;

const zenSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="icon _lg" aria-hidden="true" focusable="false" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" fill="none" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
</svg>
`;
