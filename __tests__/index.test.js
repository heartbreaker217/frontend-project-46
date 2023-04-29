import genDiff from '../src/index.js';

test('testing function genDiff() on JSON', () => {
  const actual1 = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(actual1).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
});

test('testing function genDiff() on YAML', () => {
  const actual1 = genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml');
  expect(actual1).toEqual(`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
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

test('testing wrong formatter options', () => {
  expect(() => {
    genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', { formatter: 'style' });
  })
    .toThrow('Unsupported formatter type');
});
