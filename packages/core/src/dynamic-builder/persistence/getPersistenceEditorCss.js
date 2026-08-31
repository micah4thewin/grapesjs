const getPersistenceEditorCss = () =>
  [
    '.gjs-db-revision-item { display: flex; flex-direction: column; gap: 8px; }',
    '.gjs-db-revision-summary { display: flex; align-items: baseline; justify-content: space-between;',
    ' gap: 12px; flex-wrap: wrap; }',
    '.gjs-db-revision-label { font-weight: 600; overflow-wrap: anywhere; }',
    '.gjs-db-revision-confirm { align-items: center; flex-wrap: wrap; }',
    '.gjs-db-revision-confirm[hidden] { display: none; }',
  ].join('\n');

export default getPersistenceEditorCss;
