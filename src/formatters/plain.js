import _ from 'lodash';
import { TYPES as t } from './util.js';

const normalize = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return (_.isString(value)) ? `'${value}'` : value;
};

const plain = (data) => {
  const iter = (currentValue, ancestry) => {
    const result = Object.entries(currentValue).flatMap(([key, val]) => {
      const { type, value1, value2 } = val;
      const newKey = `${ancestry}.${key}`;
      const path = _.trimStart(newKey, '.');
      switch (type) {
        case t.added:
          return `Property '${path}' was added with value: ${normalize(value2)}`;
        case t.deleted:
          return `Property '${path}' was removed`;
        case t.edited:
          return `Property '${path}' was updated. From ${normalize(value1)} to ${normalize(value2)}`;
        case t.tree:
          return `${iter(val.children, newKey)}`;
        default:
          return [];
      }
    }).join('\n');
    return result;
  };
  return iter(data, '');
};

export default plain;
