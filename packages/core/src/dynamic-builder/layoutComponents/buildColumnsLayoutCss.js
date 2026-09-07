import buildThemeTokenCss from './buildThemeTokenCss.js';
import getColumnPresetRecord from './getColumnPresetRecord.js';
import getLayoutSpacingScale from './getLayoutSpacingScale.js';

const buildColumnsLayoutCss = () => {
  const presetRecord = getColumnPresetRecord();
  const gapSizeRecord = getLayoutSpacingScale().gapSizes;
  const presetRules = Object.keys(presetRecord).map(
    (presetKey) =>
      `.db-columns[data-db-columns=${presetKey}] { grid-template-columns: ${presetRecord[presetKey].gridTemplate}; }`,
  );
  const gapRules = Object.keys(gapSizeRecord).map(
    (sizeKey) => `.db-columns[data-db-gap=${sizeKey}] { gap: ${gapSizeRecord[sizeKey].cssValue}; }`,
  );
  const themedColumnSelector =
    '.db-column[data-db-theme=light], .db-column[data-db-theme=dark], .db-column[data-db-theme=brand]';
  return [
    '.db-columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--db-space-6, 2rem); align-items: start; }',
    ...presetRules,
    ...gapRules,
    '.db-columns[data-db-valign=middle] { align-items: center; }',
    '.db-columns[data-db-valign=bottom] { align-items: end; }',
    '.db-column { min-width: 0; min-height: var(--db-space-6, 2rem); }',
    `${themedColumnSelector} { padding: var(--db-space-5, 1.5rem); border-radius: var(--db-radius-md, 0.5rem); }`,
    '.db-column[data-db-align=center] { text-align: center; }',
    '.db-column[data-db-align=center] .db-text { margin-left: auto; margin-right: auto; }',
    buildThemeTokenCss('.db-column'),
    '@media (max-width: 767.98px) {',
    '.db-columns:not([data-db-mobile=side-by-side]) { display: flex; flex-direction: column; }',
    '.db-columns[data-db-mobile=stack-reverse] { flex-direction: column-reverse; }',
    '}',
  ].join('\n');
};

export default buildColumnsLayoutCss;
