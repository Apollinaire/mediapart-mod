import { writeFile } from "fs";
import path from "path";

const writeCssToLocal = async (
  css: string,
  fileName: string = "mediapart.css"
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, fileName);
    writeFile(filePath, css, "utf8", (error) => {
      if (error) reject(error);
      console.log(filePath);
      resolve();
    });
  });
};

export default writeCssToLocal;
