import getLightboxRuntimeSource from './getLightboxRuntimeSource.js';

const runCanvasLightboxRuntime = (editor) => {
  const canvasWindow = editor.Canvas && editor.Canvas.getWindow && editor.Canvas.getWindow();
  if (!canvasWindow || typeof canvasWindow.Function !== 'function') return false;
  try {
    new canvasWindow.Function(getLightboxRuntimeSource()).call(canvasWindow);
  } catch (runtimeError) {
    return false;
  }
  return true;
};

export default runCanvasLightboxRuntime;
