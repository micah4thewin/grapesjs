import getAnimationRuntimeSource from './getAnimationRuntimeSource.js';

const runCanvasAnimationRuntime = (editor) => {
  const canvasWindow = editor.Canvas && editor.Canvas.getWindow && editor.Canvas.getWindow();
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  if (!canvasWindow || !canvasDocument || !canvasDocument.documentElement) return 0;
  const animatedCount = canvasDocument.querySelectorAll('[data-db-aos]:not([data-db-aos="none"])').length;
  if (!animatedCount) return 0;
  try {
    const runtimeFactory = new canvasWindow.Function(getAnimationRuntimeSource());
    runtimeFactory.call(canvasWindow);
  } catch (runtimeError) {
    return 0;
  }
  return animatedCount;
};

export default runCanvasAnimationRuntime;
