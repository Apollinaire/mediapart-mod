import https from 'https';

const MEDIAPART_CSS_URL = 'https://www.mediapart.fr/assets/front/css/main.min.css';
const MEDIAPART_CSS_URL_NEW = 'https://blogs.mediapart.fr/assets/front/nouvelle_formule/css/main.min.css';

const getCss = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    https.get(MEDIAPART_CSS_URL_NEW, res => {
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

export default getCss;
