import yaml from 'js-yaml';

const parse = (format, data) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error('Extension is invalid. Try to compare only JSON or YAML files.');
  }
};

export default parse;
