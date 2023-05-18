import _ from 'lodash';

const baseIndentCount = 4;
const beginDepth = 1;
const indentType = ' ';
const leftOffset = 2;

const stylish = (diffTree) => {
  const innerStringify = (obj, depth, indentCount) => {
    const indent = indentType.repeat(depth * baseIndentCount - leftOffset);
    const bracketIndent = indentType.repeat(depth * baseIndentCount);
    const normalize = (data) => (_.isPlainObject(data) ? `${innerStringify(data, depth + 1, indentCount + baseIndentCount)}${bracketIndent}}` : data);

    const str = Object.entries(obj).reduce((result, [currentKey, currentValue]) => {
      const { status, value } = currentValue;

      switch (status) {
        case 'tree':
          return `${result}${bracketIndent}${currentKey}: ${normalize(currentValue.children)}\n`;
        case 'immutable':
          return `${result}${bracketIndent}${currentKey}: ${normalize(value)}\n`;
        case 'deleted':
          return `${result}${indent}- ${currentKey}: ${normalize(value)}\n`;
        case 'added':
          return `${result}${indent}+ ${currentKey}: ${normalize(value)}\n`;
        case 'edited':
          return `${result}${indent}- ${currentKey}: ${normalize(value.key1)}\n${indent}+ ${currentKey}: ${normalize(value.key2)}\n`;
        case undefined:
          return `${result}${bracketIndent}${currentKey}: ${normalize(currentValue)}\n`;
        default:
          throw new Error('there is no way!');
      }
    }, '{\n');

    return `${str}`;
  };
  return innerStringify(diffTree, beginDepth, baseIndentCount).concat('}');
};

export default stylish;
