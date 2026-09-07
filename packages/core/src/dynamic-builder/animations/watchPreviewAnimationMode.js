import isEditorLive from '../support/isEditorLive.js';
import runCanvasAnimationRuntime from './runCanvasAnimationRuntime.js';
import stopCanvasAnimationRuntime from './stopCanvasAnimationRuntime.js';
import watchLiveCanvasModes from '../support/watchLiveCanvasModes.js';

const watchPreviewAnimationMode = (editor) => {
  watchLiveCanvasModes(editor, {
    onRun: (liveEditor) => {
      if (isEditorLive(liveEditor)) runCanvasAnimationRuntime(liveEditor);
    },
    onStop: (liveEditor) => {
      if (isEditorLive(liveEditor)) stopCanvasAnimationRuntime(liveEditor);
    },
  });
};

export default watchPreviewAnimationMode;
