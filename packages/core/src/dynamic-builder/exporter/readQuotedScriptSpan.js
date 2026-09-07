const readQuotedScriptSpan = (sourceText, startIndex, quoteCharacter) => {
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

export default readQuotedScriptSpan;
