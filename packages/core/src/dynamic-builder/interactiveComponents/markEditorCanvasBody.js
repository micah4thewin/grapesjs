const markEditorCanvasBody = (editor) => {
  const resolveCanvasBody = () => {
    const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
    return canvasDocument && canvasDocument.body ? canvasDocument.body : null;
  };
  const applyCanvasMarker = () => {
    const bodyElement = resolveCanvasBody();
    if (!bodyElement || bodyElement.hasAttribute('data-db-editor-canvas')) return;
    bodyElement.setAttribute('data-db-editor-canvas', 'true');
  };
  const setPreviewFlag = (isPreviewing) => {
    const bodyElement = resolveCanvasBody();
    if (!bodyElement) return;
    if (isPreviewing) bodyElement.setAttribute('data-db-editor-preview', 'true');
    else bodyElement.removeAttribute('data-db-editor-preview');
  };
  applyCanvasMarker();
  editor.on('canvas:frame:load:head', applyCanvasMarker);
  editor.on('canvas:frame:load:body', applyCanvasMarker);
  editor.on('command:run:core:preview', () => setPreviewFlag(true));
  editor.on('command:stop:core:preview', () => setPreviewFlag(false));
};

export default markEditorCanvasBody;
