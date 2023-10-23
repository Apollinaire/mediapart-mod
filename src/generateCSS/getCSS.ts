import https from 'https';
import { JSDOM } from 'jsdom';
import { mainCssRegex } from '../utils/constants';

const getFile = async (link: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    https.get(link, res => {
      let data = '';

      res.on('data', content => {
        data += content;
      });
      res.on('end', () => {
        resolve(data);
      });
      res.on('error', err => {
        reject(err);
      });
    });
  });
};

export const getMainCssLink = async () => {
  const html = await getFile('https://www.mediapart.fr/');
  const dom = new JSDOM(html);
  const styleEl: NodeListOf<HTMLLinkElement> = dom.window.document.querySelectorAll('head link[rel=stylesheet]');

  let mainCssLink = ''

  styleEl.forEach((el: HTMLLinkElement) => {
    const { href } = el;
    if (mainCssRegex.test(href)) {
      mainCssLink = href;
    }
  });
  if (mainCssLink) {
    return mainCssLink
  }
  throw new Error('Main CSS not found');
};

export default getFile;
