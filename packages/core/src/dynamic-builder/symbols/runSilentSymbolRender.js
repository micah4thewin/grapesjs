import resolveEditorModel from './resolveEditorModel.js';

const resolveTrackingState = (undoManager) => {
  const undoInstance = undoManager && typeof undoManager.getInstance === 'function' ? undoManager.getInstance() : null;
  return Boolean(undoInstance && typeof undoInstance.isTracking === 'function' && undoInstance.isTracking());
};

const runSilentSymbolRender = (editorOrModel, renderCallback) => {
  const editorModel = resolveEditorModel(editorOrModel);
  const startDepth = editorModel ? Number(editorModel.get('dbSymbolRenderDepth') || 0) : 0;
  const undoManager = editorModel ? editorModel.UndoManager : null;
  const wasTracking = resolveTrackingState(undoManager);
  editorModel && editorModel.set('dbSymbolRenderDepth', startDepth + 1);
  wasTracking && undoManager.stop();
  try {
    renderCallback();
  } finally {
    wasTracking && undoManager.start();
    editorModel && editorModel.set('dbSymbolRenderDepth', startDepth);
  }
};

export default runSilentSymbolRender;
