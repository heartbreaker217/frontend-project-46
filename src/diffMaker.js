import _ from 'lodash';

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

export default calculateDiff;
