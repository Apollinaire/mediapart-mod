import { writeFile } from "fs";
import path from "path";

const filePath = path.join(__dirname, "mediapart.css");

const writeCssToLocal = async (css: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    writeFile(filePath, css, "utf8", (error) => {
      if (error) reject(error);
      console.log(filePath)
      resolve();
    });
  });
};

export default writeCssToLocal;
