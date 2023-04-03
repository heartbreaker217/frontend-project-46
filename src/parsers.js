import * as fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (format, filepath) => {
  let parser;
  if (format === 'json') {
    parser = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath)));
  } else if (format === 'yml' || format === 'yaml') {
    parser = yaml.load(fs.readFileSync(path.resolve(process.cwd(), filepath)));
  } else {
    throw new Error('Extension is invalid. Try to compare only JSON or YAML files.');
  }

  return parser;
};

export default parse;
