const readRegexScriptSpan = (sourceText, startIndex) => {
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

export default readRegexScriptSpan;
