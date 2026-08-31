import registerCanvasStyles from '../support/registerCanvasStyles.js';

const registerBlockCompositionStyles = (editor) => {
  const compositionCss = [
    '.db-figure { margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }',
    '.db-figure-caption { font-size: 0.875rem; color: var(--db-color-text-muted, #64748b); }',
    '.db-icon-row { display: flex; align-items: center; gap: 0.75rem; }',
    '.db-icon-row .db-text { margin: 0; }',
    '.db-eyebrow { display: inline-block; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }',
    '.db-eyebrow { color: var(--db-color-accent, #4f46e5); margin: 0 0 0.5rem; }',
  ].join('\n');
  registerCanvasStyles(editor, 'db-css-blocks-compositions', compositionCss);
};

export default registerBlockCompositionStyles;
