import { mainCssRegex } from './constants';

export const getNameFromLink = link => {
  return (
    'dark_theme__' + link.replace('https://', '').replace(/\//g, '__').replace(mainCssRegex, 'main.css') // remove the ID from the main file
  );
};

export const exponentialDelay = (f, maxPower) => {
  const delayedF = async (delay = 0) => {
    const result = await f();
    if (!result) {
      const newDelay = maxPower ? Math.min(maxPower, delay) : delay;
      setTimeout(() => {
        delayedF(newDelay + 1);
      }, Math.pow(2, newDelay));
    }
    return result;
  };

  return delayedF;
};
