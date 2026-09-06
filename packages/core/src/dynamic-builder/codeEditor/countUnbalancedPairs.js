const countUnbalancedPairs = (codeText, openCharacter, closeCharacter, options = {}) => {
  const allowLineComments = options.lineComments === true;
  let depthCount = 0;
  let lowestDepth = 0;
  let insideString = '';
  let insideBlockComment = false;
  let charIndex = 0;
  while (charIndex < codeText.length) {
    const currentChar = codeText[charIndex];
    const nextChar = charIndex + 1 < codeText.length ? codeText[charIndex + 1] : '';
    if (insideBlockComment) {
      if (currentChar === '*' && nextChar === '/') {
        insideBlockComment = false;
        charIndex += 2;
        continue;
      }
      charIndex += 1;
      continue;
    }
    if (insideString) {
      if (currentChar === '\\') {
        charIndex += 2;
        continue;
      }
      if (currentChar === insideString) insideString = '';
      charIndex += 1;
      continue;
    }
    if (currentChar === '/' && nextChar === '*') {
      insideBlockComment = true;
      charIndex += 2;
      continue;
    }
    if (allowLineComments && currentChar === '/' && nextChar === '/') {
      const lineBreakIndex = codeText.indexOf('\n', charIndex);
      charIndex = lineBreakIndex < 0 ? codeText.length : lineBreakIndex + 1;
      continue;
    }
    if (currentChar === '"' || currentChar === "'" || currentChar === '`') {
      insideString = currentChar;
      charIndex += 1;
      continue;
    }
    if (currentChar === openCharacter) depthCount += 1;
    if (currentChar === closeCharacter) depthCount -= 1;
    if (depthCount < lowestDepth) lowestDepth = depthCount;
    charIndex += 1;
  }
  return { depth: depthCount, lowestDepth, unterminatedComment: insideBlockComment };
};

export default countUnbalancedPairs;
