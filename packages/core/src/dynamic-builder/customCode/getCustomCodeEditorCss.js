const getCustomCodeEditorCss = () =>
  [
    '.gjs-db-custom-code-form { display: grid; gap: 14px; }',
    '.gjs-db-custom-code-warning { display: flex; gap: 8px; align-items: flex-start; margin: 0;',
    '  padding: 10px 12px; border-radius: 6px; border: 1px solid rgba(220, 38, 38, 0.45);',
    '  background: rgba(220, 38, 38, 0.08); font-size: 12px; line-height: 1.5; }',
    '.gjs-db-custom-code-warning svg { flex: none; margin-top: 2px; }',
    '.gjs-db-custom-code-form textarea.gjs-db-field-input {',
    '  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px;',
    '  min-height: 88px; resize: vertical; }',
    '.gjs-db-custom-code-toggle { display: flex; gap: 8px; align-items: center; cursor: pointer; }',
  ].join('\n');

export default getCustomCodeEditorCss;
