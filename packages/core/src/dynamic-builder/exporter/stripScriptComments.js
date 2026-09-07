import canStartRegexLiteral from './canStartRegexLiteral.js';
import readQuotedScriptSpan from './readQuotedScriptSpan.js';
import readRegexScriptSpan from './readRegexScriptSpan.js';

const stripScriptComments = (sourceText) => {
  let outputText = '';
  let cursor = 0;
  while (cursor < sourceText.length) {
    const character = sourceText[cursor];
    const nextCharacter = sourceText[cursor + 1];
    if (character === '"' || character === "'" || character === '`') {
      const endIndex = readQuotedScriptSpan(sourceText, cursor, character);
      outputText += sourceText.slice(cursor, endIndex);
      cursor = endIndex;
    } else if (character === '/' && nextCharacter === '/') {
      const lineEnd = sourceText.indexOf('\n', cursor);
      cursor = lineEnd < 0 ? sourceText.length : lineEnd;
    } else if (character === '/' && nextCharacter === '*') {
      const commentEnd = sourceText.indexOf('*/', cursor + 2);
      cursor = commentEnd < 0 ? sourceText.length : commentEnd + 2;
    } else if (character === '/' && canStartRegexLiteral(outputText)) {
      const endIndex = readRegexScriptSpan(sourceText, cursor);
      outputText += sourceText.slice(cursor, endIndex);
      cursor = endIndex;
    } else {
      outputText += character;
      cursor += 1;
    }
  }
  return outputText;
};

export default stripScriptComments;
