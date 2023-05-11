import path from 'path';
import * as fs from 'fs';

const getFileExt = (filepath) => path.extname(filepath).slice(1);

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath));

export { getFileExt, readFile };
