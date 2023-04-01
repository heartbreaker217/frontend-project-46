import genDiff from '../src/index.js';

test('testing function genDiff()', () => {
  const actual1 = genDiff('/Users/lokotkov_va/Desktop/codred/HEXLET/frontend-project-46/__fixtures__/file1.json', '/Users/lokotkov_va/Desktop/codred/HEXLET/frontend-project-46/__fixtures__/file2.json');
  expect(actual1).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('testing extension', () => {
  expect(() => {
    genDiff('/Users/lokotkov_va/Desktop/codred/HEXLET/frontend-project-46/__fixtures__/file1.yaml', '/Users/lokotkov_va/Desktop/codred/HEXLET/frontend-project-46/__fixtures__/file2.json');
  })
    .toThrow('Extension is invalid. Try to compare only ".json" files.');
});
