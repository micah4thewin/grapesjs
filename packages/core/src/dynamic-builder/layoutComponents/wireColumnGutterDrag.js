import resetColumnWidths from './resetColumnWidths.js';
import resolveGutterIndexAtPoint from './resolveGutterIndexAtPoint.js';
import startColumnGutterDrag from './startColumnGutterDrag.js';

const resolveColumnsTarget = (editor, pointerEvent) => {
  const targetElement = pointerEvent.target;
  if (!targetElement || !targetElement.classList || !targetElement.classList.contains('db-columns')) return null;
  const canvasWindow = targetElement.ownerDocument.defaultView;
  if (canvasWindow.getComputedStyle(targetElement).display !== 'grid') return null;
  const columnsComponent = editor.getWrapper().find(`#${targetElement.id}`)[0];
  if (!columnsComponent || !columnsComponent.is || !columnsComponent.is('db-columns')) return null;
  const gutterIndex = resolveGutterIndexAtPoint(targetElement, pointerEvent.clientX);
  return gutterIndex < 0 ? null : { columnsComponent, columnsElement: targetElement, gutterIndex };
};

const wireColumnGutterDrag = (editor) => {
  const wiredDocuments = new WeakSet();
  const handleMouseDown = (pointerEvent) => {
    if (pointerEvent.button !== 0) return;
    const gutterTarget = resolveColumnsTarget(editor, pointerEvent);
    if (!gutterTarget) return;
    pointerEvent.preventDefault();
    pointerEvent.stopPropagation();
    startColumnGutterDrag(
      editor,
      gutterTarget.columnsComponent,
      gutterTarget.columnsElement,
      gutterTarget.gutterIndex,
      pointerEvent,
    );
  };
  const handleDoubleClick = (pointerEvent) => {
    const gutterTarget = resolveColumnsTarget(editor, pointerEvent);
    if (!gutterTarget) return;
    pointerEvent.preventDefault();
    pointerEvent.stopPropagation();
    resetColumnWidths(gutterTarget.columnsComponent);
  };
  const attachToCanvas = () => {
    const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
    if (!canvasDocument || wiredDocuments.has(canvasDocument)) return;
    wiredDocuments.add(canvasDocument);
    canvasDocument.addEventListener('mousedown', handleMouseDown, true);
    canvasDocument.addEventListener('dblclick', handleDoubleClick, true);
  };
  editor.on('canvas:frame:load:body', attachToCanvas);
  if (editor.onReady) editor.onReady(attachToCanvas);
};

export default wireColumnGutterDrag;
