const getCustomCodeEditorCss = () =>
  [
    '.gjs-db-custom-code-form { display: grid; gap: 14px; }',
    '.gjs-db-custom-code-warning { display: flex; gap: 8px; align-items: flex-start; margin: 0;',
    '  padding: 10px 12px; border-radius: 6px; border: 1px solid rgba(220, 38, 38, 0.45);',
    '  background: rgba(220, 38, 38, 0.08); font-size: 12px; line-height: 1.5; }',
    '.gjs-db-custom-code-warning svg { flex: none; margin-top: 2px; }',
    '.gjs-db-custom-code-form textarea.gjs-db-field-input {',
    '  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px;',
    '  min-height: 68px; resize: vertical; }',
    '.gjs-db-custom-code-toggle { display: flex; gap: 10px; align-items: center; min-height: 32px; cursor: pointer; }',
    '.gjs-db-custom-code-toggle input[type="checkbox"] { width: 18px; height: 18px; margin: 0; }',
    '.gjs-db-custom-code-script-note { margin: 6px 0 0; padding: 8px 10px; border-radius: 6px; font-size: 11.5px;',
    '  line-height: 1.5; background: rgba(217, 119, 6, 0.12); color: #92400e; }',
    '.gjs-db-custom-code-form .gjs-db-button-row { display: flex; justify-content: flex-end; gap: 8px; }',
    '@media (pointer: coarse) { .gjs-db-custom-code-toggle input[type="checkbox"] { width: 24px; height: 24px; } }',
  ].join('\n');

export default getCustomCodeEditorCss;
