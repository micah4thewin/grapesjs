import getDialogRuntimeSource from './getDialogRuntimeSource.js';
import getFlowRuntimeSource from './getFlowRuntimeSource.js';
import isEditorLive from '../support/isEditorLive.js';
import showToastNotice from '../support/showToastNotice.js';
import stopCanvasFlowRuntime from './stopCanvasFlowRuntime.js';

const runCanvasFlowRuntime = (editor, dialogSettings) => {
  const canvasWindow = editor.Canvas && editor.Canvas.getWindow && editor.Canvas.getWindow();
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  if (!canvasWindow || !canvasDocument || !canvasDocument.body) return 0;
  stopCanvasFlowRuntime(editor);
  const flowElementCount = canvasDocument.querySelectorAll('[data-db-flows]').length;
  if (!flowElementCount) return 0;
  canvasWindow.dbFlowsPreview = true;
  canvasWindow.dbFlowsNotice = (messageText) => {
    if (isEditorLive(editor)) showToastNotice(editor, messageText, { kind: 'warning', duration: 5000 });
  };
  try {
    if (typeof canvasWindow.dbShowDialog !== 'function') {
      new canvasWindow.Function(getDialogRuntimeSource(dialogSettings || {})).call(canvasWindow);
    }
    new canvasWindow.Function(getFlowRuntimeSource()).call(canvasWindow);
  } catch (runtimeError) {
    console.error('Flow preview could not start', runtimeError);
    return 0;
  }
  return flowElementCount;
};

export default runCanvasFlowRuntime;
