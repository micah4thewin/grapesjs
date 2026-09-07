import collectCanvasFlowRecords from './collectCanvasFlowRecords.js';
import describeFlowPreviewWarnings from './describeFlowPreviewWarnings.js';
import isEditorLive from '../support/isEditorLive.js';
import runCanvasFlowRuntime from './runCanvasFlowRuntime.js';
import showToastNotice from '../support/showToastNotice.js';
import stopCanvasFlowRuntime from './stopCanvasFlowRuntime.js';
import watchLiveCanvasModes from '../support/watchLiveCanvasModes.js';

const warnAboutPreviewLimits = (editor) => {
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  const warnings = describeFlowPreviewWarnings(canvasDocument, collectCanvasFlowRecords(canvasDocument));
  warnings
    .slice(0, 2)
    .forEach((warningText) => showToastNotice(editor, warningText, { kind: 'warning', duration: 6000 }));
};

const watchPreviewInteractionMode = (editor, dialogSettings) => {
  watchLiveCanvasModes(editor, {
    delay: 260,
    onRun: (liveEditor) => {
      if (!isEditorLive(liveEditor)) return;
      if (runCanvasFlowRuntime(liveEditor, dialogSettings)) warnAboutPreviewLimits(liveEditor);
    },
    onStop: (liveEditor) => {
      if (isEditorLive(liveEditor)) stopCanvasFlowRuntime(liveEditor);
    },
  });
};

export default watchPreviewInteractionMode;
