const buildSectionLayoutCss = () =>
  [
    '.db-section { position: relative; padding: var(--db-space-10, 5rem) var(--db-space-5, 1.5rem); }',
    '.db-section[data-db-layout=narrow] { padding: var(--db-space-9, 4rem) var(--db-space-5, 1.5rem); }',
    '.db-section[data-db-layout=wide] { padding: var(--db-space-11, 6rem) var(--db-space-4, 1rem); }',
    '.db-section[data-db-layout=full] { padding: var(--db-space-10, 5rem) 0; }',
    '.db-section[data-db-theme=light] { background-color: var(--db-color-surface-alt, #f4f6fa); color: var(--db-color-text, #111827); }',
    '.db-section[data-db-theme=dark] { background-color: var(--db-color-text, #111827); color: var(--db-color-surface, #ffffff); }',
    '.db-section[data-db-theme=brand] { background-color: var(--db-color-brand, #4f46e5); color: var(--db-color-brand-contrast, #ffffff); }',
    '.db-section[data-db-has-bg=true] { background-image: var(--db-section-bg-image, none); background-size: cover; background-position: center; background-repeat: no-repeat; }',
    '.db-section[data-db-overlay=true] { color: var(--db-color-surface, #ffffff); }',
    '.db-section[data-db-overlay=true]::before { content: ""; position: absolute; inset: 0; background: linear-gradient(rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.55)); pointer-events: none; }',
    '.db-section[data-db-overlay=true] > .db-container { position: relative; z-index: 1; }',
    '@media (max-width: 767.98px) { .db-section { padding-top: var(--db-space-8, 3rem); padding-bottom: var(--db-space-8, 3rem); } }',
  ].join('\n');

export default buildSectionLayoutCss;
