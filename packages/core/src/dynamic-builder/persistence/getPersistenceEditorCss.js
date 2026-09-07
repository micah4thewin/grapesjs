const getPersistenceEditorCss = () =>
  [
    '.gjs-db-revision-item { display: flex; flex-direction: column; align-items: stretch; gap: 8px; }',
    '.gjs-db-revision-summary { display: flex; align-items: baseline; justify-content: space-between;',
    ' gap: 12px; flex-wrap: wrap; }',
    '.gjs-db-revision-label { font-weight: 600; overflow-wrap: anywhere; }',
    '.gjs-db-revision-label .gjs-db-badge { margin-left: 6px; vertical-align: middle; }',
    '.gjs-db-revision-meta { font-size: 11px; }',
    '.gjs-db-revision-confirm { align-items: center; flex-wrap: wrap; }',
    '.gjs-db-revision-confirm[hidden] { display: none; }',
    '.gjs-db-revisions-modal .gjs-db-button, .gjs-db-history-row { min-height: 32px; }',
    '.gjs-db-history-row { width: 100%; text-align: left; cursor: pointer; }',
    '.gjs-db-history-row[aria-current="step"] { font-weight: 600; }',
    '.gjs-db-history-future { opacity: 0.6; }',
    '@media (pointer: coarse) {',
    '.gjs-db-revisions-modal .gjs-db-button, .gjs-db-history-row, .gjs-db-save-revision-modal .gjs-db-button',
    ' { min-height: 44px; }',
    '}',
  ].join('\n');

export default getPersistenceEditorCss;
