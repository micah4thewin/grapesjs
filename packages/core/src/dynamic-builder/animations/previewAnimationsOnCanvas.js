import measureAnimationSpan from './measureAnimationSpan.js';
import runCanvasAnimationRuntime from './runCanvasAnimationRuntime.js';
import stopCanvasAnimationRuntime from './stopCanvasAnimationRuntime.js';

const scrollSelectionIntoView = (editor) => {
  const selectedComponent = editor.getSelected && editor.getSelected();
  const selectedElement = selectedComponent && selectedComponent.getEl && selectedComponent.getEl();
  if (!selectedElement || !selectedElement.scrollIntoView) return;
  try {
    selectedElement.scrollIntoView({ behavior: 'auto', block: 'center' });
  } catch (scrollError) {
    selectedElement.scrollIntoView();
  }
};

const previewAnimationsOnCanvas = (editor) => {
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  if (!canvasDocument || !canvasDocument.documentElement) return 0;
  stopCanvasAnimationRuntime(editor);
  scrollSelectionIntoView(editor);
  const animatedCount = runCanvasAnimationRuntime(editor);
  if (!animatedCount) return 0;
  const previewSpan = measureAnimationSpan(canvasDocument) + 1600;
  const previewTimer = setTimeout(() => stopCanvasAnimationRuntime(editor), previewSpan);
  editor.getModel().set('dbAnimationPreviewTimer', previewTimer);
  return animatedCount;
};

export default previewAnimationsOnCanvas;
