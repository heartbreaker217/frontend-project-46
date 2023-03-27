#!/usr/bin/env node

import { program } from 'commander';
import * as fs from 'fs';
import path from 'path';
import _ from 'lodash';

const compare = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.union(keys1, keys2).sort().reduce((acc, key) => {
    let resultStr = acc;
    if (!Object.hasOwn(obj1, key)) {
      resultStr += `  + ${key}: ${obj2[key]}\n`;
    } else if (!Object.hasOwn(obj2, key)) {
      resultStr += `  - ${key}: ${obj1[key]}\n`;
    } else if (obj1[key] !== obj2[key]) {
      resultStr += `  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
    } else {
      resultStr += `    ${key}: ${obj2[key]}\n`;
    }
    return resultStr;
  }, '{\n');

  return keys.concat('}');
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1)));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath2)));
  const result = compare(obj1, obj2);
  console.log(result);
  return result;
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('filepath1')
  .argument('filepath2')
  .action(genDiff)
  .parse(process.argv);
