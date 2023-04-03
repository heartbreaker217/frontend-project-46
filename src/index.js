import _ from 'lodash';
import getFileExt from './util.js';
import parse from './parsers.js';

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2).sort().reduce((acc, key) => {
    let resultStr = acc;
    if (!Object.hasOwn(obj1, key)) {
      resultStr += `  + ${key}: ${obj2[key]}\n`;
    } else if (!Object.hasOwn(obj2, key)) {
      resultStr += `  - ${key}: ${obj1[key]}\n`;
    } else if (obj1[key] !== obj2[key]) {
      resultStr += `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
    } else {
      resultStr += `    ${key}: ${obj2[key]}\n`;
    }
    return resultStr;
  }, '{\n');

  return keys.concat('}');
};

const genDiff = (filepath1, filepath2) => {
  const file1Ext = getFileExt(filepath1);
  const file2Ext = getFileExt(filepath2);

  if (file1Ext === file2Ext) {
    const obj1 = parse(file1Ext, filepath1);
    const obj2 = parse(file2Ext, filepath2);
    const result = compare(obj1, obj2);
    console.log(result);
    return result;
  }
  throw new Error('Comparing files have a different extensions. Try to compare files with the same extensions.');
};

export default genDiff;
