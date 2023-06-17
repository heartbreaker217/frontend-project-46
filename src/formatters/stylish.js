import _ from 'lodash';
import { TYPES as t } from './util.js';

const baseIndentCount = 4;
const beginDepth = 1;
const indentType = ' ';
const leftOffset = 2;
const indentCounter = (type, depth, baseIndent, offset) => type.repeat(depth * baseIndent - offset);

const stylish = (diffTree) => {
  const innerStringify = (data, depth, indentCount) => {
    const indent = indentCounter(indentType, depth, baseIndentCount, leftOffset);
    const bracketIndent = indentType.repeat(depth * baseIndentCount);
    const normalize = (value) => (_.isPlainObject(value) ? `${innerStringify(value, depth + 1, indentCount + baseIndentCount)}${bracketIndent}}` : String(value));

    return Object.entries(data).reduce((result, [currentKey, currentValue]) => {
      const { type, value1, value2 } = currentValue;

      switch (type) {
        case t.tree:
          return `${result}${bracketIndent}${currentKey}: ${normalize(currentValue.children)}\n`;
        case t.immutable:
          return `${result}${bracketIndent}${currentKey}: ${normalize(value1)}\n`;
        case t.deleted:
          return `${result}${indent}- ${currentKey}: ${normalize(value1)}\n`;
        case t.added:
          return `${result}${indent}+ ${currentKey}: ${normalize(value2)}\n`;
        case t.edited:
          return `${result}${indent}- ${currentKey}: ${normalize(value1)}\n${indent}+ ${currentKey}: ${normalize(value2)}\n`;
        case undefined:
          return `${result}${bracketIndent}${currentKey}: ${normalize(currentValue)}\n`;
        default:
          throw new Error('there is no way!');
      }
    }, '{\n');
  };
  return innerStringify(diffTree, beginDepth, baseIndentCount).concat('}');
};

export default stylish;
