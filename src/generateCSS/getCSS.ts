import https from 'https';

const getCss = async (link: string): Promise<string> => {
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

export default getCss;
