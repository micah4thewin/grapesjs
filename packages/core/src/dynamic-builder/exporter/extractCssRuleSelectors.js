const skippedAtRulePattern =
  /^@(?:[-a-z]+-)?(?:keyframes|font-face|page|counter-style|property|font-feature-values)\b/i;

const extractCssRuleSelectors = (cssText) => {
  const sourceText = String(cssText == null ? '' : cssText).replace(/\/\*[\s\S]*?\*\//g, '');
  const selectorList = [];
  const blockStack = [];
  let preludeText = '';
  let quoteCharacter = '';
  for (let cursor = 0; cursor < sourceText.length; cursor += 1) {
    const character = sourceText[cursor];
    if (quoteCharacter) {
      if (character === '\\') cursor += 1;
      else if (character === quoteCharacter) quoteCharacter = '';
      continue;
    }
    if (character === '"' || character === "'") {
      quoteCharacter = character;
      continue;
    }
    if (character === '{') {
      const trimmedPrelude = preludeText.trim();
      const insideSkippedBlock = blockStack.some((blockName) => skippedAtRulePattern.test(blockName));
      if (trimmedPrelude.startsWith('@')) {
        blockStack.push(trimmedPrelude);
      } else {
        blockStack.push('');
        if (!insideSkippedBlock) {
          trimmedPrelude
            .split(',')
            .map((selectorText) => selectorText.trim())
            .filter(Boolean)
            .forEach((selectorText) => selectorList.push(selectorText));
        }
      }
      preludeText = '';
      continue;
    }
    if (character === '}') {
      blockStack.pop();
      preludeText = '';
      continue;
    }
    if (character === ';') {
      preludeText = '';
      continue;
    }
    preludeText += character;
  }
  return selectorList;
};

export default extractCssRuleSelectors;
