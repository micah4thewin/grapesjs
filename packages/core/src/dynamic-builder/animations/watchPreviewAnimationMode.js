import runCanvasAnimationRuntime from './runCanvasAnimationRuntime.js';
import stopCanvasAnimationRuntime from './stopCanvasAnimationRuntime.js';

const liveModeCommandIds = ['core:preview', 'core:fullscreen'];

const watchPreviewAnimationMode = (editor) => {
  const isAnyLiveModeActive = () =>
    liveModeCommandIds.some((commandId) => editor.Commands && editor.Commands.isActive(commandId));
  liveModeCommandIds.forEach((commandId) => {
    editor.on('command:run:' + commandId, () => setTimeout(() => runCanvasAnimationRuntime(editor), 240));
    editor.on('command:stop:' + commandId, () => {
      stopCanvasAnimationRuntime(editor);
      if (isAnyLiveModeActive()) setTimeout(() => runCanvasAnimationRuntime(editor), 240);
    });
  });
};

export default watchPreviewAnimationMode;
