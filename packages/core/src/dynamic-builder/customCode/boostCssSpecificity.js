const boostPrefix = ':root:root';
const skippedAtRules = /^@(keyframes|-webkit-keyframes|font-face|counter-style|page|property|font-feature-values)/i;

const splitSelectorList = (selectorText) => {
  const selectors = [];
  let depth = 0;
  let current = '';
  let quoteChar = '';
  [...selectorText].forEach((character) => {
    if (quoteChar) {
      if (character === quoteChar) quoteChar = '';
    } else if (character === '"' || character === "'") {
      quoteChar = character;
    } else if (character === '(' || character === '[') {
      depth += 1;
    } else if (character === ')' || character === ']') {
      depth -= 1;
    } else if (character === ',' && depth === 0) {
      selectors.push(current);
      current = '';
      return;
    }
    current += character;
  });
  selectors.push(current);
  return selectors;
};

const boostSelector = (selectorText) => {
  const trimmedSelector = selectorText.trim();
  if (!trimmedSelector) return trimmedSelector;
  const rootMatch = trimmedSelector.match(/^(html|:root)(?![\w-])/i);
  if (rootMatch) return rootMatch[1] + boostPrefix + trimmedSelector.slice(rootMatch[1].length);
  return boostPrefix + ' ' + trimmedSelector;
};

const boostCssSpecificity = (cssText) => {
  const sourceText = String(cssText || '');
  let output = '';
  let cursor = 0;
  let braceDepth = 0;
  const skipDepths = [];
  while (cursor < sourceText.length) {
    const openIndex = sourceText.indexOf('{', cursor);
    const closeIndex = sourceText.indexOf('}', cursor);
    if (openIndex < 0 && closeIndex < 0) {
      output += sourceText.slice(cursor);
      break;
    }
    if (closeIndex >= 0 && (openIndex < 0 || closeIndex < openIndex)) {
      output += sourceText.slice(cursor, closeIndex + 1);
      if (skipDepths[skipDepths.length - 1] === braceDepth) skipDepths.pop();
      braceDepth = Math.max(0, braceDepth - 1);
      cursor = closeIndex + 1;
      continue;
    }
    const preludeStart = Math.max(sourceText.lastIndexOf('}', openIndex), sourceText.lastIndexOf(';', openIndex)) + 1;
    const preludeText = sourceText.slice(Math.max(cursor, preludeStart), openIndex);
    const insideSkipped = skipDepths.length > 0;
    const trimmedPrelude = preludeText.trim();
    if (trimmedPrelude.indexOf('@') === 0) {
      if (skippedAtRules.test(trimmedPrelude)) skipDepths.push(braceDepth + 1);
      output += sourceText.slice(cursor, openIndex + 1);
    } else if (insideSkipped || !trimmedPrelude) {
      output += sourceText.slice(cursor, openIndex + 1);
    } else {
      const leadingSpace = preludeText.match(/^\s*/)[0];
      output += sourceText.slice(cursor, Math.max(cursor, preludeStart));
      output += leadingSpace + splitSelectorList(trimmedPrelude).map(boostSelector).join(', ') + ' {';
    }
    braceDepth += 1;
    cursor = openIndex + 1;
  }
  return output;
};

export default boostCssSpecificity;
