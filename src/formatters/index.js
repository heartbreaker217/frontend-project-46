import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const formatter = (type) => {
  const formatFunction = formatters[type];
  if (!formatFunction) {
    throw Error('Unsupported format type');
  }
  return formatFunction;
};

export default formatter;
