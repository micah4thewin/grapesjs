const getFieldPickerEditorCss = () =>
  [
    '.gjs-db-field-pick { display: grid; grid-template-columns: minmax(90px, 1fr) 2fr auto; gap: 10px;',
    '  width: 100%; min-height: 36px; border: none; background: transparent; text-align: left;',
    '  font: inherit; color: inherit; cursor: pointer; }',
    '.gjs-db-field-pick:focus-visible { outline: 2px solid var(--gjs-db-focus); outline-offset: -2px; }',
    '.gjs-db-field-pick-label { font-weight: 600; color: var(--gjs-db-fg); }',
    '.gjs-db-field-pick-sample { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
    '.gjs-db-field-pick-token { font-family: var(--gjs-db-font-mono); font-size: 0.7rem;',
    '  color: var(--gjs-db-faint); }',
    '.gjs-db-data-check-item { display: grid; grid-template-columns: 1fr auto; gap: 10px; align-items: center; }',
    '.gjs-db-data-check-detail { font-size: 0.72rem; color: var(--gjs-db-faint); }',
  ].join('\n');

export default getFieldPickerEditorCss;
