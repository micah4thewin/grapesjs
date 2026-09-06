const isWhitespace = (character) => character === ' ' || character === '\n' || character === '\t' || character === '\r';

const stripCssComments = (cssText) => {
  let outputText = '';
  let quoteCharacter = '';
  let cursor = 0;
  while (cursor < cssText.length) {
    const character = cssText[cursor];
    if (quoteCharacter) {
      outputText += character;
      if (character === '\\' && cursor + 1 < cssText.length) {
        outputText += cssText[cursor + 1];
        cursor += 2;
        continue;
      }
      if (character === quoteCharacter) quoteCharacter = '';
      cursor += 1;
      continue;
    }
    if (character === '"' || character === "'") {
      quoteCharacter = character;
      outputText += character;
      cursor += 1;
      continue;
    }
    if (character === '/' && cssText[cursor + 1] === '*') {
      const commentEnd = cssText.indexOf('*/', cursor + 2);
      cursor = commentEnd < 0 ? cssText.length : commentEnd + 2;
      continue;
    }
    outputText += character;
    cursor += 1;
  }
  return outputText;
};

const minifyCssText = (cssText) => {
  const sourceText = stripCssComments(String(cssText == null ? '' : cssText));
  let outputText = '';
  let quoteCharacter = '';
  let parenDepth = 0;
  let cursor = 0;
  const lastOutput = () => outputText[outputText.length - 1] || '';
  while (cursor < sourceText.length) {
    const character = sourceText[cursor];
    if (quoteCharacter) {
      outputText += character;
      if (character === '\\' && cursor + 1 < sourceText.length) {
        outputText += sourceText[cursor + 1];
        cursor += 2;
        continue;
      }
      if (character === quoteCharacter) quoteCharacter = '';
      cursor += 1;
      continue;
    }
    if (character === '"' || character === "'") {
      quoteCharacter = character;
      outputText += character;
      cursor += 1;
      continue;
    }
    if (character === '(') parenDepth += 1;
    if (character === ')') parenDepth = Math.max(0, parenDepth - 1);
    if (isWhitespace(character)) {
      let lookahead = cursor;
      while (lookahead < sourceText.length && isWhitespace(sourceText[lookahead])) lookahead += 1;
      const nextCharacter = sourceText[lookahead] || '';
      const previousCharacter = lastOutput();
      const dropsSpace =
        !previousCharacter ||
        !nextCharacter ||
        '{};,'.indexOf(previousCharacter) >= 0 ||
        '{};,'.indexOf(nextCharacter) >= 0 ||
        (previousCharacter === ':' && parenDepth === 0) ||
        (parenDepth > 0 && (previousCharacter === '(' || nextCharacter === ')'));
      if (!dropsSpace) outputText += ' ';
      cursor = lookahead;
      continue;
    }
    if (character === '}' && lastOutput() === ';') outputText = outputText.slice(0, -1);
    outputText += character;
    cursor += 1;
  }
  return outputText.trim();
};

export default minifyCssText;
