import _ from 'lodash';

const normalize = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return (_.isString(value)) ? `'${value}'` : value;
};

const plain = (data) => {
  const iter = (currentValue, ancestry) => {
    const result = Object.entries(currentValue).flatMap(([key, val]) => {
      const { status, value } = val;
      const newKey = `${ancestry}.${key}`;
      const path = _.trimStart(newKey, '.');
      switch (status) {
        case 'added':
          return `Property '${path}' was added with value: ${normalize(value)}`;
        case 'deleted':
          return `Property '${path}' was removed`;
        case 'edited':
          return `Property '${path}' was updated. From ${normalize(value.key1)} to ${normalize(value.key2)}`;
        case 'tree':
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
