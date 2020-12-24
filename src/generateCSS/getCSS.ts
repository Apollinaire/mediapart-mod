import https from "https";

const MEDIAPART_CSS_URL = "https://static.mediapart.fr/css/main.min.css";

const getCss = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    https.get(MEDIAPART_CSS_URL, (res) => {
      let data = "";

      res.on("data", (content) => {
        data += content;
      });
      res.on("end", () => {
        resolve(data);
      });
      res.on("error", (err) => {
        reject(err);
      });
    });
  });
};

export default getCss;
