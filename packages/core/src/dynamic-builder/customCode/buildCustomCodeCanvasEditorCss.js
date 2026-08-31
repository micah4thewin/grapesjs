const buildCustomCodeCanvasEditorCss = () =>
  [
    '[data-db-type="custom-css"], [data-db-type="custom-script"] {',
    '  display: flex; gap: 12px; align-items: flex-start; border: 1px dashed #94a3b8; border-radius: 8px;',
    '  padding: 12px 14px; margin: 8px 0; background: #f8fafc; color: #334155;',
    '  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;',
    '  font-size: 13px; line-height: 1.5;',
    '}',
    '.db-code-card-icon { display: inline-flex; flex: none; color: #475569; margin-top: 2px; }',
    '.db-code-card-icon svg { width: 20px; height: 20px; }',
    '.db-code-card-body { display: grid; gap: 4px; min-width: 0; }',
    '.db-code-card-title { font-size: 13px; font-weight: 600; }',
    '.db-code-card-preview { display: block; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;',
    '  font-size: 12px; background: #e2e8f0; border-radius: 4px; padding: 2px 6px; overflow: hidden;',
    '  text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }',
    '.db-code-card-note { font-size: 11px; color: #64748b; }',
    '.db-custom-html:empty { min-height: 32px; outline: 1px dashed #cbd5e1; }',
  ].join('\n');

export default buildCustomCodeCanvasEditorCss;
