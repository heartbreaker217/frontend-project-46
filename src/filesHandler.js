import path from 'path';
import * as fs from 'fs';

const validExtensions = ['json', 'yml', 'yaml'];

const getFileExt = (filepath) => {
  const ext = path.extname(filepath).slice(1);
  if (validExtensions.includes(ext)) {
    return ext;
  }
  throw new Error('Extension is invalid. Try to compare only JSON or YAML files.');
};

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath));

export { getFileExt, readFile };
