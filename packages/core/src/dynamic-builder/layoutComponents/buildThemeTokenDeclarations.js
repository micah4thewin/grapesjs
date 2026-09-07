import getSectionThemeRecord from './getSectionThemeRecord.js';

const buildThemeTokenDeclarations = (themeKey) => {
  const themeEntry = getSectionThemeRecord()[themeKey];
  if (!themeEntry) return '';
  const tokenRecord = themeEntry.tokens;
  const tokenDeclarations = Object.keys(tokenRecord).map((tokenName) => `${tokenName}: ${tokenRecord[tokenName]};`);
  return [...tokenDeclarations, 'color: var(--db-color-text, #111827);'].join(' ');
};

export default buildThemeTokenDeclarations;
