import { handleKey } from './interactions';

const ignoredTagnames = ['input', 'textarea'];

document.addEventListener('keydown', e => {
  // ignore when we are inside an input
  const tagname = e.target.tagName.toLowerCase();
  if (ignoredTagnames.includes(tagname)) {
    return;
  }
  if (e.ctrlKey || e.altKey || e.shiftKey) {
    return
  }
  handleKey(e.key);
});
