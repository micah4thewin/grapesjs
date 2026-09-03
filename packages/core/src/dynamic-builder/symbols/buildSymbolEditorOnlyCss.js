const buildSymbolEditorOnlyCss = () =>
  [
    '[data-db-type="symbol"] { outline: 1px dashed rgba(99, 102, 241, 0.55); outline-offset: 2px; }',
    '[data-db-type="symbol"][data-db-symbol-editing="true"] {',
    '  outline: 2px solid rgba(217, 119, 6, 0.85); outline-offset: 3px; }',
    '[data-db-type="symbol"]::after { content: "Reusable"; position: absolute; top: 0; right: 0;',
    '  transform: translateY(-100%); padding: 2px 6px; border-radius: 4px 4px 0 0;',
    '  background: rgba(99, 102, 241, 0.9); color: #fff; font: 600 10px/1.4 system-ui, sans-serif;',
    '  letter-spacing: 0.04em; pointer-events: none; }',
    '[data-db-type="symbol"][data-db-symbol-editing="true"]::after { content: "Editing everywhere";',
    '  background: rgba(217, 119, 6, 0.95); }',
  ].join('\n');

export default buildSymbolEditorOnlyCss;
