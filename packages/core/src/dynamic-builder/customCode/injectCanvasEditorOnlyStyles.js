import buildCustomCodeCanvasEditorCss from './buildCustomCodeCanvasEditorCss.js';
import injectStylesOnce from '../support/injectStylesOnce.js';

const injectCanvasEditorOnlyStyles = (editor) => {
  const applyCanvasEditorStyles = () => {
    const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
    if (!canvasDocument) return;
    injectStylesOnce(canvasDocument, 'db-customcode-canvas-editor-only', buildCustomCodeCanvasEditorCss());
  };
  applyCanvasEditorStyles();
  if (!editor.getModel().get('dbCustomCodeCanvasCssListener')) {
    editor.getModel().set('dbCustomCodeCanvasCssListener', true);
    editor.on('canvas:frame:load:body', applyCanvasEditorStyles);
  }
};

export default injectCanvasEditorOnlyStyles;
