const getSymbolEditorCss = () =>
  [
    '.gjs-db-symbol-library { display: grid; gap: 12px; }',
    '.gjs-db-symbol-intro, .gjs-db-symbol-empty { margin: 0; font-size: 12px; line-height: 1.6;',
    '  color: var(--gjs-db-muted, #64748b); }',
    '.gjs-db-symbol-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }',
    '.gjs-db-symbol-card { display: flex; align-items: center; gap: 10px; padding: 10px 12px;',
    '  border-radius: 10px; background: var(--gjs-db-sunken, rgba(15, 23, 42, 0.04)); }',
    '.gjs-db-symbol-card-icon { display: flex; flex: none; color: var(--gjs-db-accent, #4f46e5); }',
    '.gjs-db-symbol-card-body { display: grid; gap: 2px; flex: 1 1 auto; min-width: 0; }',
    '.gjs-db-symbol-card-name { font-size: 13px; font-weight: 600; overflow: hidden;',
    '  text-overflow: ellipsis; white-space: nowrap; }',
    '.gjs-db-symbol-card-meta { font-size: 11px; color: var(--gjs-db-muted, #64748b); }',
    '.gjs-db-symbol-card-actions { display: flex; flex: none; gap: 4px; }',
    '.gjs-db-symbol-action { display: inline-flex; align-items: center; justify-content: center;',
    '  width: 28px; height: 28px; padding: 0; }',
    '.gjs-db-symbol-name-form { display: grid; gap: 14px; }',
  ].join('\n');

export default getSymbolEditorCss;
