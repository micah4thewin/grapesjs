import applyBindingPreviewInElement from './applyBindingPreviewInElement.js';
import listSelectedElements from './listSelectedElements.js';
import restoreBindingPreviewInElement from './restoreBindingPreviewInElement.js';

const refreshCanvasBindingPreview = (editor) => {
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument ? editor.Canvas.getDocument() : null;
  const bodyElement = canvasDocument && canvasDocument.body;
  if (!bodyElement) return;
  const selectedElements = listSelectedElements(editor);
  selectedElements.forEach((selectedElement) => restoreBindingPreviewInElement(selectedElement));
  applyBindingPreviewInElement(editor, bodyElement, { skipElements: selectedElements });
};

export default refreshCanvasBindingPreview;
