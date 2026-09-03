const buildDialogSiteCss = () =>
  [
    '.db-dialog-overlay { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center;',
    '  justify-content: center; padding: 1.5rem; background: rgba(15, 23, 42, 0.55); }',
    '.db-dialog { width: min(26rem, 100%); padding: 1.75rem; border-radius: 1rem; text-align: center;',
    '  background: var(--db-color-surface, #fff); color: var(--db-color-text, #0f172a);',
    '  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.28); }',
    '.db-dialog-title { margin: 0 0 0.5rem; font-size: 1.25rem; line-height: 1.3; }',
    '.db-dialog-text { margin: 0 0 1.25rem; font-size: 0.95rem; line-height: 1.6;',
    '  color: var(--db-color-text-muted, #475569); }',
    '.db-dialog-actions { display: flex; gap: 0.5rem; justify-content: center; }',
    '.db-dialog-button { padding: 0.6rem 1.25rem; border: 0; border-radius: 0.5rem; cursor: pointer;',
    '  font: inherit; font-weight: 600; }',
    '.db-dialog-confirm { background: var(--db-color-accent, #4f46e5); color: #fff; }',
    '.db-dialog-cancel { background: transparent; color: inherit;',
    '  box-shadow: inset 0 0 0 1px var(--db-color-border, rgba(15, 23, 42, 0.18)); }',
    '.db-dialog-button:focus-visible { outline: 2px solid var(--db-color-accent, #4f46e5); outline-offset: 2px; }',
    '.db-dialog-success .db-dialog-title { color: #15803d; }',
    '.db-dialog-error .db-dialog-title { color: #b91c1c; }',
    '.db-dialog-warning .db-dialog-title { color: #b45309; }',
    '.db-alert-button { cursor: pointer; }',
  ].join('\n');

export default buildDialogSiteCss;
