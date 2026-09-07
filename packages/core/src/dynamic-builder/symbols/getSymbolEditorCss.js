const getSymbolEditorCss = () =>
  [
    '.gjs-db-symbol-library { display: grid; gap: 12px; }',
    '.gjs-db-symbol-intro, .gjs-db-symbol-empty { margin: 0; font-size: 12px; line-height: 1.6;',
    '  color: var(--gjs-db-muted, #64748b); }',
    '.gjs-db-symbol-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }',
    '.gjs-db-symbol-card { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 10px 12px;',
    '  align-items: center; padding: 12px; border-radius: 12px;',
    '  background: var(--gjs-db-sunken, rgba(15, 23, 42, 0.04)); }',
    '.gjs-db-symbol-card-preview { display: flex; width: 72px; height: 45px; border-radius: 8px;',
    '  overflow: hidden; background: var(--gjs-db-panel, #fff); box-shadow: var(--gjs-db-lift-1, none);',
    '  color: var(--gjs-db-fg, #0f172a); }',
    '.gjs-db-symbol-card-preview svg { width: 100%; height: 100%; display: block; }',
    '.gjs-db-symbol-card-body { display: grid; gap: 3px; min-width: 0; }',
    '.gjs-db-symbol-card-name { font-size: 13px; font-weight: 600; overflow: hidden;',
    '  text-overflow: ellipsis; white-space: nowrap; }',
    '.gjs-db-symbol-card-meta { font-size: 11px; color: var(--gjs-db-muted, #64748b); }',
    '.gjs-db-symbol-card-actions { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 6px; }',
    '.gjs-db-symbol-action { min-height: 36px; padding: 0 12px; gap: 6px; }',
    '.gjs-db-symbol-action-icon { width: 36px; padding: 0; }',
    '.gjs-db-symbol-action-confirm { width: auto; padding: 0 12px; }',
    '.gjs-db-symbol-card-actions .gjs-db-symbol-action-icon:last-child { margin-left: auto; }',
    '.gjs-db-symbol-name-form { display: grid; gap: 14px; }',
  ].join('\n');

export default getSymbolEditorCss;
