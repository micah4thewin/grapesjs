import attachLongPressDrag from './attachLongPressDrag.js';

const applyTouchTranslation = (editor, hapticsEnabled) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const editorDragSelector = '.gjs-block, .gjs-layer-move, .gjs-toolbar-item';
  attachLongPressDrag(containerElement.ownerDocument, editorDragSelector, hapticsEnabled);
  const wireCanvasDocument = () => {
    const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
    canvasDocument && attachLongPressDrag(canvasDocument, 'body *', hapticsEnabled);
  };
  wireCanvasDocument();
  editor.on('canvas:frame:load:body', wireCanvasDocument);
  editor.on('page:select', () => setTimeout(wireCanvasDocument, 120));
};

export default applyTouchTranslation;
