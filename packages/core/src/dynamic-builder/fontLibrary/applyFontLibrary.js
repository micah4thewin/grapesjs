import getFontLibraryEditorCss from './getFontLibraryEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openFontLibraryModal from './openFontLibraryModal.js';
import registerCommandSet from '../support/registerCommandSet.js';

const applyFontLibrary = (editor, pluginOptions) => {
  const designTokenOptions = (pluginOptions && pluginOptions.designTokens) || {};
  registerCommandSet(editor, {
    'db:open-font-library': (commandEditor) => openFontLibraryModal(commandEditor, designTokenOptions),
  });
  const injectStyles = () => {
    if (!editor.getContainer || !editor.getContainer()) return;
    injectEditorStylesOnce(editor, 'db-css-font-library', getFontLibraryEditorCss());
  };
  injectStyles();
  if (editor.onReady) editor.onReady(() => injectStyles());
};

export default applyFontLibrary;
