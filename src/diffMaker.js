import _ from 'lodash';

const calculateDiff = (obj1, obj2) => {
  const copyObj1 = _.cloneDeep(obj1);
  const copyObj2 = _.cloneDeep(obj2);

  const keys1 = Object.keys(copyObj1);
  const keys2 = Object.keys(copyObj2);

  const diffTree = _.union(keys1, keys2).sort().reduce((acc, key) => {
    if (!Object.hasOwn(copyObj1, key)) {
      acc[key] = {
        status: 'added',
        value: copyObj2[key],
      };
    } else if (!Object.hasOwn(copyObj2, key)) {
      acc[key] = {
        status: 'deleted',
        value: copyObj1[key],
      };
    } else if (_.isPlainObject(copyObj1[key]) && _.isPlainObject(copyObj2[key])) {
      acc[key] = {
        status: 'tree',
        children: calculateDiff(copyObj1[key], copyObj2[key]),
      };
    } else if (copyObj1[key] !== copyObj2[key]) {
      acc[key] = {
        status: 'edited',
        value: {
          key1: copyObj1[key],
          key2: copyObj2[key],
        },
      };
    } else {
      acc[key] = {
        status: 'immutable',
        value: copyObj1[key],
      };
    }
    return acc;
  }, {});

  return diffTree;
};

export default calculateDiff;
