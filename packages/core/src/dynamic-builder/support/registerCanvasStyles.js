import getCanvasCssRegistry from './getCanvasCssRegistry.js';
import injectStylesOnce from './injectStylesOnce.js';

const registerCanvasStyles = (editor, styleId, cssText) => {
  const cssRegistry = getCanvasCssRegistry(editor);
  const isFirstRegistration = !editor.getModel().get('dbCanvasCssListener');
  cssRegistry.set(styleId, cssText);
  const applyRegisteredStyles = () => {
    const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
    if (!canvasDocument) return;
    cssRegistry.forEach((registeredCss, registeredId) => injectStylesOnce(canvasDocument, registeredId, registeredCss));
  };
  applyRegisteredStyles();
  if (isFirstRegistration) {
    editor.getModel().set('dbCanvasCssListener', true);
    editor.on('canvas:frame:load:body', applyRegisteredStyles);
  }
};

export default registerCanvasStyles;
