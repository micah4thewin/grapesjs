const buildDataBindingBaseCss = () =>
  [
    '.db-repeater { display: grid; gap: var(--db-space-4, 1rem);',
    'grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); align-items: stretch; }',
    '.db-repeater-item { display: flex; flex-direction: column; gap: var(--db-space-2, 0.5rem);',
    'padding: var(--db-space-4, 1rem); background: var(--db-color-surface, #ffffff);',
    'border: 1px solid var(--db-color-line, #dfe3ea); border-radius: var(--db-radius-md, 0.5rem);',
    'box-shadow: var(--db-shadow-sm, 0 1px 2px 0 rgba(15, 23, 42, 0.08)); }',
    '.db-repeater-item-heading { margin: 0; font-size: var(--db-type-lg, 1.15rem);',
    'color: var(--db-color-text, #111827); }',
    '.db-repeater-item-body { margin: 0; font-size: var(--db-type-base, 1rem);',
    'color: var(--db-color-text-muted, #5b6472); }',
    '.db-repeater-item-meta { font-size: var(--db-type-sm, 0.9rem); font-weight: 600;',
    'color: var(--db-color-brand, #4f46e5); }',
    '.db-repeater [data-db-repeater-item] { outline: 1px dashed var(--db-color-line, #dfe3ea);',
    'outline-offset: 2px; }',
    '.db-repeater-empty { grid-column: 1 / -1; padding: var(--db-space-5, 1.5rem); text-align: center;',
    'border: 1px dashed var(--db-color-line, #dfe3ea); border-radius: var(--db-radius-md, 0.5rem);',
    'color: var(--db-color-text-muted, #5b6472); font-size: var(--db-type-sm, 0.9rem);',
    'background: var(--db-color-surface-alt, #f4f6fa); }',
    '@media (max-width: 640px) { .db-repeater { grid-template-columns: 1fr; } }',
  ].join('\n');

export default buildDataBindingBaseCss;
