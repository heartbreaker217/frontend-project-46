import _ from 'lodash';
import { TYPES as t } from './formatters/util.js';

const calculateDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.reduce((acc, key) => {
    if (!_.has(data1, key)) {
      return {
        ...acc,
        [key]: { type: t.added, value2: data2[key] },
      };
    }
    if (!_.has(data2, key)) {
      return {
        ...acc,
        [key]: { type: t.deleted, value1: data1[key] },
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        ...acc,
        [key]: { type: t.tree, children: calculateDiff(data1[key], data2[key]) },
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        ...acc,
        [key]: { type: t.edited, value1: data1[key], value2: data2[key] },
      };
    }
    return {
      ...acc,
      [key]: { type: t.immutable, value1: data1[key] },
    };
  }, {});
  return result;
};

export default calculateDiff;
