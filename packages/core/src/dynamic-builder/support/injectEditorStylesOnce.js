import injectStylesOnce from './injectStylesOnce.js';

const injectEditorStylesOnce = (editor, styleId, cssText) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  injectStylesOnce(containerElement.ownerDocument, styleId, cssText);
};

export default injectEditorStylesOnce;
