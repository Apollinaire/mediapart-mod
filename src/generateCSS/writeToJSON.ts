import { promises } from 'fs';
import path from 'path';

const writeToJSON = (jsonStr: string): Promise<void> => {
  const jsonPath = path.join(__dirname, 'styles.json');
  return promises.writeFile(jsonPath, jsonStr);
};

export default writeToJSON;
