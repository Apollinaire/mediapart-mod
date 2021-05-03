import { getConfig, setDarkTheme, setZenMode } from './utils/config';

console.log('start background');

chrome.commands.onCommand.addListener(async command => {
  switch (command) {
    case 'toggle-theme':
      const { darkTheme } = await getConfig();
      console.log({ command, darkTheme });
      await setDarkTheme(!darkTheme);
      break;
    case 'toggle-zen':
      const { zenMode } = await getConfig();
      await setZenMode(!zenMode);
      break;
    default:
      break;
  }
});
