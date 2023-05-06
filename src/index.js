import _ from 'lodash';
import getFileExt from './util.js';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const calculateDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const diffTree = _.union(keys1, keys2).sort().reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      acc[key] = {
        status: 'added',
        value: obj2[key],
      };
    } else if (!Object.hasOwn(obj2, key)) {
      acc[key] = {
        status: 'deleted',
        value: obj1[key],
      };
    } else if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      acc[key] = {
        status: 'tree',
        children: calculateDiff(obj1[key], obj2[key]),
      };
    } else if (obj1[key] !== obj2[key]) {
      acc[key] = {
        status: 'edited',
        value: {
          key1: obj1[key],
          key2: obj2[key],
        },
      };
    } else {
      acc[key] = {
        status: 'immutable',
        value: obj1[key],
      };
    }
    return acc;
  }, {});

  return diffTree;
};

const genDiff = (filepath1, filepath2, options = { format: 'stylish' }) => {
  const file1Ext = getFileExt(filepath1);
  const file2Ext = getFileExt(filepath2);
  const format = formatter(options.format);

  if (file1Ext === file2Ext) {
    const obj1 = parse(file1Ext, filepath1);
    const obj2 = parse(file2Ext, filepath2);
    const diffTree = calculateDiff(obj1, obj2);
    const result = format(diffTree);
    console.log(result);
    return result;
  }
  throw new Error('Comparing files have a different extensions. Try to compare files with the same extensions.');
};

export default genDiff;
