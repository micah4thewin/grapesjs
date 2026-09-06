const findAtRuleEndIndex = (cssText, startIndex) => {
  let quoteCharacter = '';
  let parenDepth = 0;
  for (let cursor = startIndex; cursor < cssText.length; cursor += 1) {
    const character = cssText[cursor];
    if (quoteCharacter) {
      if (character === '\\') cursor += 1;
      else if (character === quoteCharacter) quoteCharacter = '';
      continue;
    }
    if (character === '"' || character === "'") quoteCharacter = character;
    else if (character === '(') parenDepth += 1;
    else if (character === ')') parenDepth = Math.max(0, parenDepth - 1);
    else if (character === '{') return -1;
    else if (character === ';' && parenDepth === 0) return cursor;
  }
  return -1;
};

export default findAtRuleEndIndex;
