import { mainCssRegex } from './constants';

export const getNameFromLink = link => {
  return (
    'dark_theme__' + link.replace('https://', '').replace(/\//g, '__').replace(mainCssRegex, 'main.css') // remove the ID from the main file
  );
};
