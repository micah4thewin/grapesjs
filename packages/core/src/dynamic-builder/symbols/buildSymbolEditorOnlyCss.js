const buildSymbolEditorOnlyCss = () =>
  [
    '[data-db-type="symbol"] { outline: 2px dashed rgba(79, 70, 229, 0.75); outline-offset: -2px; }',
    '[data-db-type="symbol"][data-db-symbol-editing="true"] {',
    '  outline: 2px solid rgba(217, 119, 6, 0.95); outline-offset: -2px; }',
    '[data-db-type="symbol"]::after { content: "Reusable"; position: absolute; top: 4px; left: 4px;',
    '  z-index: 5; padding: 2px 7px; border-radius: 4px; background: #4f46e5; color: #fff;',
    '  font: 600 10px/1.4 system-ui, sans-serif; letter-spacing: 0.04em; pointer-events: none; }',
    '[data-db-type="symbol"][data-db-symbol-editing="true"]::after { content: "Editing everywhere";',
    '  background: #d97706; }',
    '[data-db-type="symbol"] [data-db-symbol-overridden="true"] {',
    '  outline: 2px dashed rgba(13, 148, 136, 0.9); outline-offset: 2px; }',
  ].join('\n');

export default buildSymbolEditorOnlyCss;
