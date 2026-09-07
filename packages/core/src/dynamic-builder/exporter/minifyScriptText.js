const regexStartTokens = '(,=:[!&|?{};+-*%<>~^';
const regexStartWords = ['return', 'typeof', 'instanceof', 'in', 'of', 'new', 'delete', 'void', 'throw', 'case', 'do', 'else'];

const endsWithRegexStartWord = (outputText) =>
  regexStartWords.some((wordText) => new RegExp('(?:^|[^\\w$])' + wordText + '$').test(outputText));

const canStartRegex = (outputText) => {
  const trimmedOutput = outputText.replace(/\s+$/, '');
  if (!trimmedOutput) return true;
  const lastCharacter = trimmedOutput[trimmedOutput.length - 1];
  if (regexStartTokens.indexOf(lastCharacter) >= 0) return true;
  return endsWithRegexStartWord(trimmedOutput);
};

const readQuotedSpan = (sourceText, startIndex, quoteCharacter) => {
  let cursor = startIndex + 1;
  while (cursor < sourceText.length) {
    const character = sourceText[cursor];
    if (character === '\\') cursor += 2;
    else if (character === quoteCharacter) return cursor + 1;
    else if (character === '\n' && quoteCharacter !== '`') return cursor;
    else cursor += 1;
  }
  return sourceText.length;
};

const readRegexSpan = (sourceText, startIndex) => {
  let cursor = startIndex + 1;
  let insideClass = false;
  while (cursor < sourceText.length) {
    const character = sourceText[cursor];
    if (character === '\\') cursor += 2;
    else if (character === '\n') return cursor;
    else if (insideClass) {
      if (character === ']') insideClass = false;
      cursor += 1;
    } else if (character === '[') {
      insideClass = true;
      cursor += 1;
    } else if (character === '/') {
      cursor += 1;
      while (cursor < sourceText.length && /[a-z]/i.test(sourceText[cursor])) cursor += 1;
      return cursor;
    } else cursor += 1;
  }
  return sourceText.length;
};

const stripScriptComments = (sourceText) => {
  let outputText = '';
  let cursor = 0;
  while (cursor < sourceText.length) {
    const character = sourceText[cursor];
    const nextCharacter = sourceText[cursor + 1];
    if (character === '"' || character === "'" || character === '`') {
      const endIndex = readQuotedSpan(sourceText, cursor, character);
      outputText += sourceText.slice(cursor, endIndex);
      cursor = endIndex;
    } else if (character === '/' && nextCharacter === '/') {
      const lineEnd = sourceText.indexOf('\n', cursor);
      cursor = lineEnd < 0 ? sourceText.length : lineEnd;
    } else if (character === '/' && nextCharacter === '*') {
      const commentEnd = sourceText.indexOf('*/', cursor + 2);
      cursor = commentEnd < 0 ? sourceText.length : commentEnd + 2;
    } else if (character === '/' && canStartRegex(outputText)) {
      const endIndex = readRegexSpan(sourceText, cursor);
      outputText += sourceText.slice(cursor, endIndex);
      cursor = endIndex;
    } else {
      outputText += character;
      cursor += 1;
    }
  }
  return outputText;
};

const collapseLineWhitespace = (sourceText) => {
  let outputText = '';
  let cursor = 0;
  while (cursor < sourceText.length) {
    const character = sourceText[cursor];
    if (character === '"' || character === "'" || character === '`') {
      const endIndex = readQuotedSpan(sourceText, cursor, character);
      outputText += sourceText.slice(cursor, endIndex);
      cursor = endIndex;
    } else if (character === '/' && canStartRegex(outputText)) {
      const endIndex = readRegexSpan(sourceText, cursor);
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
      if (outputText[outputText.length - 1] !== '\n' && outputText) outputText += '\n';
      cursor += 1;
    } else {
      outputText += character;
      cursor += 1;
    }
  }
  return outputText.trim();
};

const minifyScriptText = (scriptText) => collapseLineWhitespace(stripScriptComments(String(scriptText == null ? '' : scriptText)));

export default minifyScriptText;
