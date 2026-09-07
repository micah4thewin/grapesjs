const ensureEditorCanvasFrame = (editor) => {
  const canvasModule = editor && editor.Canvas;
  if (!canvasModule || typeof canvasModule.getDocument !== 'function') return false;
  if (canvasModule.getDocument() || typeof canvasModule.postLoad !== 'function') return false;
  const canvasModel = typeof canvasModule.getModel === 'function' ? canvasModule.getModel() : null;
  const frameCollection = canvasModel ? canvasModel.frames : null;
  if (!frameCollection || frameCollection.length) return false;
  const pagesModule = editor.Pages;
  const selectedPage = pagesModule && pagesModule.getSelected ? pagesModule.getSelected() : null;
  if (!selectedPage) return false;
  canvasModule.postLoad();
  return true;
};

export default ensureEditorCanvasFrame;
