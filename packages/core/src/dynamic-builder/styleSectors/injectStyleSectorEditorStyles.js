import getStyleSectorEditorCss from './getStyleSectorEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';

const injectStyleSectorEditorStyles = (editor) => {
  const injectStyles = () => {
    if (!editor.getContainer || !editor.getContainer()) return;
    injectEditorStylesOnce(editor, 'db-css-style-sectors', getStyleSectorEditorCss());
  };
  injectStyles();
  if (editor.onReady) editor.onReady(injectStyles);
};

export default injectStyleSectorEditorStyles;
