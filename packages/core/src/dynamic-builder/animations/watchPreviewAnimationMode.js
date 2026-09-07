import runCanvasAnimationRuntime from './runCanvasAnimationRuntime.js';
import stopCanvasAnimationRuntime from './stopCanvasAnimationRuntime.js';
import watchLiveCanvasModes from '../support/watchLiveCanvasModes.js';

const watchPreviewAnimationMode = (editor) => {
  watchLiveCanvasModes(editor, {
    onRun: (liveEditor) => runCanvasAnimationRuntime(liveEditor),
    onStop: (liveEditor) => stopCanvasAnimationRuntime(liveEditor),
  });
};

export default watchPreviewAnimationMode;
