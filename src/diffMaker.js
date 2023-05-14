import _ from 'lodash';

const calculateDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.map((key) => {
    if (!_.has(data1, key)) {
      return [key, { status: 'added', value: data2[key] }];
    }
    if (!_.has(data2, key)) {
      return [key, { status: 'deleted', value: data1[key] }];
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return [key, { status: 'tree', children: calculateDiff(data1[key], data2[key]) }];
    }
    if (data1[key] !== data2[key]) {
      return [key, { status: 'edited', value: { key1: data1[key], key2: data2[key] } }];
    }
    return [key, { status: 'immutable', value: data1[key] }];
  });
  return _.fromPairs(result);
};

export default calculateDiff;
