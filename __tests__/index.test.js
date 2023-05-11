import genDiff from '../src/index.js';
import { readFile } from '../src/filesHandler.js';

test('testing function genDiff() on JSON', () => {
  const actual1 = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(actual1).toEqual(readFile('__fixtures__/expectsOfGenDiff/file1file2Stylish.txt').toString());
});

test('testing function genDiff() on YAML', () => {
  const actual1 = genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml');
  expect(actual1).toEqual(readFile('__fixtures__/expectsOfGenDiff/file1file2Stylish.txt').toString());
});

test('testing invalid extensions', () => {
  expect(() => {
    genDiff('__fixtures__/file1.ini', '__fixtures__/file2.ini');
  })
    .toThrow('Extension is invalid. Try to compare only JSON or YAML files.');
});

test('testing wrong formatter options', () => {
  expect(() => {
    genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', { format: 'style' });
  })
    .toThrow('Unsupported format type');
});

test('testing plain formatter', () => {
  const actual1 = genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', { format: 'plain' });
  expect(actual1).toEqual(readFile('__fixtures__/expectsOfGenDiff/file1file2Plain.txt').toString());
});

test('testing json formatter', () => {
  const actual1 = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', { format: 'json' });
  expect(actual1).toEqual(readFile('__fixtures__/expectsOfGenDiff/file1file2JSON.txt').toString());
});
