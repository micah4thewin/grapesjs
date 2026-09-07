import canStartRegexLiteral from './canStartRegexLiteral.js';
import readQuotedScriptSpan from './readQuotedScriptSpan.js';
import readRegexScriptSpan from './readRegexScriptSpan.js';

const collapseScriptWhitespace = (sourceText) => {
  let outputText = '';
  let cursor = 0;
  while (cursor < sourceText.length) {
    const character = sourceText[cursor];
    if (character === '"' || character === "'" || character === '`') {
      const endIndex = readQuotedScriptSpan(sourceText, cursor, character);
      outputText += sourceText.slice(cursor, endIndex);
      cursor = endIndex;
    } else if (character === '/' && canStartRegexLiteral(outputText)) {
      const endIndex = readRegexScriptSpan(sourceText, cursor);
      outputText += sourceText.slice(cursor, endIndex);
      cursor = endIndex;
    } else if (character === ' ' || character === '\t' || character === '\r') {
      let lookahead = cursor;
      while (lookahead < sourceText.length && ' \t\r'.indexOf(sourceText[lookahead]) >= 0) lookahead += 1;
      const lastOutput = outputText[outputText.length - 1] || '';
      const nextCharacter = sourceText[lookahead] || '';
      if (lastOutput && lastOutput !== '\n' && nextCharacter && nextCharacter !== '\n') outputText += ' ';
      cursor = lookahead;
    } else if (character === '\n') {
      if (outputText && outputText[outputText.length - 1] !== '\n') outputText += '\n';
      cursor += 1;
    } else {
      outputText += character;
      cursor += 1;
    }
  }
  return outputText.trim();
};

export default collapseScriptWhitespace;
