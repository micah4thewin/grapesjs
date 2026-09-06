import runCanvasAnimationRuntime from './runCanvasAnimationRuntime.js';
import stopCanvasAnimationRuntime from './stopCanvasAnimationRuntime.js';

const watchPreviewAnimationMode = (editor) => {
  editor.on('command:run:core:preview', () => setTimeout(() => runCanvasAnimationRuntime(editor), 220));
  editor.on('command:stop:core:preview', () => stopCanvasAnimationRuntime(editor));
  editor.on('command:run:core:fullscreen', () => setTimeout(() => runCanvasAnimationRuntime(editor), 260));
};

export default watchPreviewAnimationMode;
