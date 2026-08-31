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
  const mobileStackRules = [
    '@media (max-width: 767.98px) {',
    '.db-columns.db-stack-mobile { display: flex; flex-direction: column; }',
    '.db-columns.db-stack-mobile[data-db-reverse-mobile=true] { flex-direction: column-reverse; }',
    '}',
  ];
  return [
    '.db-columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--db-space-6, 2rem); align-items: start; }',
    ...presetRules,
    ...gapRules,
    '.db-column { min-width: 0; min-height: var(--db-space-6, 2rem); }',
    ...mobileStackRules,
  ].join('\n');
};

export default buildColumnsLayoutCss;
