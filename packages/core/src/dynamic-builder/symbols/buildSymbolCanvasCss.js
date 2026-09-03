const buildSymbolCanvasCss = () =>
  [
    '.db-symbol { display: block; position: relative; }',
    '.db-symbol-placeholder { padding: 1.25rem; border: 1px dashed currentColor; border-radius: 0.5rem;',
    '  opacity: 0.6; font-size: 0.875rem; text-align: center; }',
  ].join('\n');

export default buildSymbolCanvasCss;
