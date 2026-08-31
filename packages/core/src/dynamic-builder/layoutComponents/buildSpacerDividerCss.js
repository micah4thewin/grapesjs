import getLayoutSpacingScale from './getLayoutSpacingScale.js';

const buildSpacerDividerCss = () => {
  const spacerSizeRecord = getLayoutSpacingScale().spacerSizes;
  const spacerRules = Object.keys(spacerSizeRecord).map(
    (sizeKey) => `.db-spacer[data-db-spacer=${sizeKey}] { height: ${spacerSizeRecord[sizeKey].cssValue}; }`,
  );
  return [
    '.db-spacer { display: block; width: 100%; height: var(--db-space-8, 3rem); }',
    ...spacerRules,
    '.db-divider { display: block; border: none; border-top: 1px solid var(--db-color-line, #dfe3ea); margin: var(--db-space-6, 2rem) auto; width: 100%; }',
    '.db-divider[data-db-divider=dashed] { border-top-style: dashed; }',
    '.db-divider[data-db-divider=decorative] { border-top: none; height: 0.25rem; width: var(--db-space-12, 8rem); border-radius: var(--db-radius-pill, 999px); background: linear-gradient(90deg, var(--db-color-brand, #4f46e5), var(--db-color-accent, #0ea5e9)); }',
  ].join('\n');
};

export default buildSpacerDividerCss;
