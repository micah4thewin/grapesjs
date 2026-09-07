import registerEditorOnlyCanvasStyles from '../support/registerEditorOnlyCanvasStyles.js';

const registerMarketingEditorStyles = (editor) =>
  registerEditorOnlyCanvasStyles(
    editor,
    'db-css-marketing-editor',
    [
      '.db-stretched-link::after { pointer-events: none; }',
      '.db-logo-cloud[data-db-marquee=true] { animation: none; flex-wrap: wrap; justify-content: center; overflow: visible; }',
    ].join('\n'),
  );

export default registerMarketingEditorStyles;
