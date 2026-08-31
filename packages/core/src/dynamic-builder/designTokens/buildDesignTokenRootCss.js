import formatTokenCssVariableName from './formatTokenCssVariableName.js';
import isPlainRecord from '../support/isPlainRecord.js';
import sanitizeTokenCssValue from './sanitizeTokenCssValue.js';

const buildDesignTokenRootCss = (tokenRecord) => {
  const safeRecord = isPlainRecord(tokenRecord) ? tokenRecord : {};
  const declarationLines = [];
  Object.keys(safeRecord).forEach((groupKey) => {
    const groupRecord = safeRecord[groupKey];
    if (!isPlainRecord(groupRecord)) return;
    Object.keys(groupRecord).forEach((tokenName) => {
      const tokenValue = sanitizeTokenCssValue(groupRecord[tokenName]);
      if (!tokenValue) return;
      declarationLines.push(`  ${formatTokenCssVariableName(groupKey, tokenName)}: ${tokenValue};`);
    });
  });
  const reducedMotionLines = Object.keys(isPlainRecord(safeRecord.motion) ? safeRecord.motion : {})
    .filter((tokenName) => /^duration/.test(tokenName))
    .map((tokenName) => `    ${formatTokenCssVariableName('motion', tokenName)}: 0ms;`);
  return [
    ':root {',
    declarationLines.join('\n'),
    '}',
    '@media (prefers-reduced-motion: reduce) {',
    '  :root {',
    reducedMotionLines.join('\n'),
    '  }',
    '}',
    '',
  ].join('\n');
};

export default buildDesignTokenRootCss;
