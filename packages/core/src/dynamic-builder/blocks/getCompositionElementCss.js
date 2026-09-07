const getCompositionElementCss = () =>
  [
    '.db-figure { margin: 0 0 var(--db-space-4, 1rem); display: flex; flex-direction: column; gap: 0.5rem; }',
    '.db-figure > .db-image { width: 100%; height: auto; }',
    '.db-figure-caption { margin: 0; font-size: max(var(--db-type-xs, 0.78rem), 0.75rem); line-height: 1.5; }',
    '.db-figure-caption { letter-spacing: 0.02em; color: var(--db-color-text-muted, #5b6472); }',
    '.db-icon-row { display: flex; align-items: center; gap: 0.75rem; margin: 0 0 var(--db-space-4, 1rem); }',
    '.db-icon-row[data-db-align=center] { justify-content: center; text-align: center; }',
    '.db-icon-row .db-text { margin: 0; }',
    '.db-eyebrow-group { margin: 0 0 var(--db-space-4, 1rem); }',
    '.db-eyebrow-group[data-db-align=center] { text-align: center; }',
    '.db-eyebrow-group > .db-heading { margin-top: 0; }',
    '.db-eyebrow { display: inline-block; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }',
    '.db-eyebrow { color: var(--db-color-accent, #4f46e5); margin: 0 0 0.5rem; }',
  ].join('\n');

export default getCompositionElementCss;
