const hoistCssImportRules = (cssText) => {
  const sourceCss = String(cssText == null ? '' : cssText);
  const hoistedRules = [];
  const strippedCss = sourceCss.replace(/@(?:charset|import)\s+[^;{]+;/gi, (ruleText) => {
    const compactRule = ruleText.trim();
    if (hoistedRules.indexOf(compactRule) < 0) hoistedRules.push(compactRule);
    return '';
  });
  const charsetRules = hoistedRules.filter((ruleText) => /^@charset/i.test(ruleText)).slice(0, 1);
  const importRules = hoistedRules.filter((ruleText) => /^@import/i.test(ruleText));
  return [...charsetRules, ...importRules, strippedCss.trim()].filter(Boolean).join('\n');
};

export default hoistCssImportRules;
