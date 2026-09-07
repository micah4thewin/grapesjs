import getDialogIconRecords from './getDialogIconRecords.js';

const buildDialogSiteCss = () => {
  const iconRecords = getDialogIconRecords();
  const kindRules = Object.keys(iconRecords).map(
    (kindName) =>
      '.db-dialog-' +
      kindName +
      ' .db-dialog-icon, .db-dialog-' +
      kindName +
      ' .db-dialog-title { color: ' +
      iconRecords[kindName].color +
      '; }',
  );
  return [
    '.db-dialog-overlay { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center;',
    '  justify-content: center; padding: 1.5rem; background: rgba(15, 23, 42, 0.55);',
    '  animation: db-dialog-fade 160ms ease-out; }',
    '.db-dialog { width: min(26rem, 100%); padding: 1.75rem; border-radius: 1rem; text-align: center;',
    '  background: var(--db-color-surface, #fff); color: var(--db-color-text, #0f172a);',
    '  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.28); animation: db-dialog-rise 200ms cubic-bezier(0.22, 1, 0.36, 1); }',
    '.db-dialog:focus { outline: none; }',
    '.db-dialog-icon { display: flex; align-items: center; justify-content: center; width: 4rem; height: 4rem;',
    '  margin: 0 auto 1rem; border-radius: 50%; border: 3px solid currentColor; }',
    '.db-dialog-icon svg { width: 2.1rem; height: 2.1rem; }',
    '.db-dialog-title { margin: 0 0 0.5rem; font-size: 1.35rem; line-height: 1.3; color: var(--db-color-text, #0f172a); }',
    '.db-dialog-text { margin: 0 0 1.25rem; font-size: 0.95rem; line-height: 1.6;',
    '  color: var(--db-color-text-muted, #475569); }',
    '.db-dialog-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }',
    '.db-dialog-button { min-height: 44px; padding: 0.6rem 1.35rem; border: 0; border-radius: 0.5rem; cursor: pointer;',
    '  font: inherit; font-weight: 600; }',
    '.db-dialog-confirm { background: var(--db-color-accent, #4f46e5); color: #fff; }',
    '.db-dialog-cancel { background: transparent; color: inherit;',
    '  box-shadow: inset 0 0 0 1px var(--db-color-border, rgba(15, 23, 42, 0.18)); }',
    '.db-dialog-button:focus-visible { outline: 2px solid var(--db-color-accent, #4f46e5); outline-offset: 2px; }',
    ...kindRules,
    '.db-alert-button { cursor: pointer; }',
    '@keyframes db-dialog-fade { from { opacity: 0; } }',
    '@keyframes db-dialog-rise { from { opacity: 0; transform: translateY(12px) scale(0.96); } }',
    '@media (prefers-reduced-motion: reduce) { .db-dialog-overlay, .db-dialog { animation: none; } }',
  ].join('\n');
};

export default buildDialogSiteCss;
