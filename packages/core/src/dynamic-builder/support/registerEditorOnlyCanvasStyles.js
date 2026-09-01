import injectStylesOnce from './injectStylesOnce.js';

const registerEditorOnlyCanvasStyles = (editor, styleId, cssText) => {
  const applyEditorOnlyStyles = () => {
    const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
    if (!canvasDocument) return;
    injectStylesOnce(canvasDocument, styleId, cssText);
  };
  const applyWithDeferredRetries = () => {
    applyEditorOnlyStyles();
    setTimeout(applyEditorOnlyStyles, 60);
    setTimeout(applyEditorOnlyStyles, 300);
  };
  applyEditorOnlyStyles();
  editor.on('canvas:frame:load:body', applyEditorOnlyStyles);
  editor.on('page:select', applyWithDeferredRetries);
  if (editor.onReady) editor.onReady(applyWithDeferredRetries);
};

export default registerEditorOnlyCanvasStyles;
