const getSchemaEditorCss = () =>
  [
    '.gjs-db-schema-modal { display: grid; gap: 16px; padding-right: 4px; }',
    '.gjs-db-schema-intro { margin: 0; }',
    '.gjs-db-schema-tabs { display: flex; gap: 8px; }',
    '.gjs-db-schema-section { display: grid; gap: 12px; align-content: start; }',
    '.gjs-db-schema-section[hidden] { display: none; }',
    '.gjs-db-schema-title-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }',
    '.gjs-db-schema-group { display: grid; gap: 12px; }',
    '.gjs-db-schema-group[hidden], .gjs-db-schema-modal [data-db-schema-when][hidden] { display: none; }',
    '.gjs-db-schema-details { border: 1px solid var(--gjs-db-line, rgba(127, 127, 127, 0.3));',
    '  border-radius: var(--gjs-db-r-2, 8px); padding: 6px 12px; }',
    '.gjs-db-schema-summary { cursor: pointer; font-weight: 600; min-height: 32px; display: flex; align-items: center; }',
    '.gjs-db-schema-details[open] .gjs-db-schema-summary { margin-bottom: 10px; }',
    '.gjs-db-schema-modal .gjs-db-button, .gjs-db-schema-modal .gjs-db-field-input { min-height: 40px; }',
    '.gjs-db-schema-modal textarea.gjs-db-field-input { min-height: 64px; resize: vertical; }',
    '.gjs-db-schema-modal a.gjs-db-button { text-decoration: none; }',
    '.gjs-db-schema-preview-actions { align-items: center; flex-wrap: wrap; }',
    '.gjs-db-schema-preview { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;',
    '  font-size: 11px; line-height: 1.5; min-height: 180px; white-space: pre; overflow: auto; }',
  ].join('\n');

export default getSchemaEditorCss;
