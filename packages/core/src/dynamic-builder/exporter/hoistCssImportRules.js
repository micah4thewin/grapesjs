import findAtRuleEndIndex from './findAtRuleEndIndex.js';

const hoistCssImportRules = (cssText) => {
  const sourceCss = String(cssText == null ? '' : cssText);
  const hoistedRules = [];
  const matcher = /@(?:charset|import)\b/gi;
  let strippedCss = '';
  let cursor = 0;
  let match = matcher.exec(sourceCss);
  while (match) {
    const endIndex = findAtRuleEndIndex(sourceCss, match.index + match[0].length);
    if (endIndex < 0) {
      match = matcher.exec(sourceCss);
      continue;
    }
    const compactRule = sourceCss.slice(match.index, endIndex + 1).trim();
    if (hoistedRules.indexOf(compactRule) < 0) hoistedRules.push(compactRule);
    strippedCss += sourceCss.slice(cursor, match.index);
    cursor = endIndex + 1;
    matcher.lastIndex = cursor;
    match = matcher.exec(sourceCss);
  }
  strippedCss += sourceCss.slice(cursor);
  const charsetRules = hoistedRules.filter((ruleText) => /^@charset/i.test(ruleText)).slice(0, 1);
  const importRules = hoistedRules.filter((ruleText) => /^@import/i.test(ruleText));
  return [...charsetRules, ...importRules, strippedCss.trim()].filter(Boolean).join('\n');
};

export default hoistCssImportRules;
