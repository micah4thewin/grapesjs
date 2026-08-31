const getSchemaEditorCss = () =>
  [
    '.gjs-db-schema-modal { display: grid; gap: 20px; max-height: 72vh; overflow-y: auto; padding-right: 4px; }',
    '.gjs-db-schema-section { display: grid; gap: 12px; align-content: start; }',
    '.gjs-db-schema-title-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }',
    '.gjs-db-schema-group { display: grid; gap: 12px; }',
    '.gjs-db-schema-group[hidden] { display: none; }',
    '.gjs-db-schema-modal textarea.gjs-db-field-input { min-height: 64px; resize: vertical; }',
    '.gjs-db-schema-preview { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;',
    '  font-size: 11px; line-height: 1.5; min-height: 180px; white-space: pre; overflow: auto; }',
  ].join('\n');

export default getSchemaEditorCss;
