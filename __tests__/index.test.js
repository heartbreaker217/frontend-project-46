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
    genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', { format: 'style' });
  })
    .toThrow('Unsupported format type');
});

test('testing plain formatter', () => {
  const actual1 = genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', { format: 'plain' });
  expect(actual1).toEqual(`Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`);
});
