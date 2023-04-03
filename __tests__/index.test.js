import genDiff from '../src/index.js';

test('testing function genDiff() on JSON', () => {
  const actual1 = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(actual1).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('testing function genDiff() on YAML', () => {
  const actual1 = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml');
  expect(actual1).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('testing different extensions', () => {
  expect(() => {
    genDiff('__fixtures__/file1.json', '__fixtures__/file2.yml');
  })
    .toThrow('Comparing files have a different extensions. Try to compare files with the same extensions.');
});

test('testing invalid extensions', () => {
  expect(() => {
    genDiff('__fixtures__/file1.ini', '__fixtures__/file2.ini');
  })
    .toThrow('Extension is invalid. Try to compare only JSON or YAML files.');
});
