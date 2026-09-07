const buildThemeRootTokenCss = () =>
  [
    ':root {',
    '  --db-theme-dark-surface: var(--db-color-text, #111827);',
    '  --db-theme-light-ink: var(--db-color-surface, #ffffff);',
    '  --db-theme-brand-surface: var(--db-color-brand, #4f46e5);',
    '  --db-theme-brand-ink: var(--db-color-brand-contrast, #ffffff);',
    '}',
  ].join('\n');

export default buildThemeRootTokenCss;
