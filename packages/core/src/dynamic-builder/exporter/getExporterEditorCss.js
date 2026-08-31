const getExporterEditorCss = () =>
  [
    '.gjs-db-export-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }',
    '.gjs-db-export-row .gjs-db-button { flex: 0 0 auto; }',
    '.gjs-db-export-name { display: flex; flex-direction: column; gap: 2px; min-width: 0; }',
    '.gjs-db-export-name .gjs-db-muted { font-size: 11px; overflow: hidden; text-overflow: ellipsis; }',
    '.gjs-db-export-section { margin-bottom: 14px; }',
    '.gjs-db-export-section .gjs-db-button-row { margin-top: 8px; }',
    '.gjs-db-publish-summary .gjs-db-badge { margin-left: 4px; }',
  ].join('\n');

export default getExporterEditorCss;
