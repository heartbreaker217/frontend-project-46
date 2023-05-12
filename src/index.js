import parse from './parsers.js';
import formatter from './formatters/index.js';
import calculateDiff from './diffMaker.js';
import { getFileExt, readFile } from './filesHandler.js';

const genDiff = (filepath1, filepath2, format) => {
  const file1Ext = getFileExt(filepath1);
  const file2Ext = getFileExt(filepath2);

  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const obj1 = parse(file1Ext, data1);
  const obj2 = parse(file2Ext, data2);

  const diffTree = calculateDiff(obj1, obj2);
  const formatFn = formatter(format);
  const result = formatFn(diffTree);
  return result;
};

export default genDiff;
