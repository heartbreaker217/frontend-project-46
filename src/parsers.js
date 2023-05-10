import yaml from 'js-yaml';

const parse = (format, data) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
      return yaml.load(data);
    default:
      return yaml.load(data);
  }
};

export default parse;
