import getCanvasCssRegistry from './getCanvasCssRegistry.js';
import injectStylesOnce from './injectStylesOnce.js';

const registerCanvasStyles = (editor, styleId, cssText) => {
  const cssRegistry = getCanvasCssRegistry(editor);
  cssRegistry.set(styleId, cssText);
  const applyRegisteredStyles = () => {
    const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
    if (!canvasDocument) return;
    cssRegistry.forEach((registeredCss, registeredId) => injectStylesOnce(canvasDocument, registeredId, registeredCss));
  };
  const applyWithDeferredRetries = () => {
    applyRegisteredStyles();
    setTimeout(applyRegisteredStyles, 60);
    setTimeout(applyRegisteredStyles, 300);
  };
  applyRegisteredStyles();
  if (!editor.getModel().get('dbCanvasCssListener')) {
    editor.getModel().set('dbCanvasCssListener', true);
    editor.on('canvas:frame:load:body', applyRegisteredStyles);
    editor.on('page:select', applyWithDeferredRetries);
    if (editor.onReady) editor.onReady(applyWithDeferredRetries);
  }
};

export default registerCanvasStyles;
