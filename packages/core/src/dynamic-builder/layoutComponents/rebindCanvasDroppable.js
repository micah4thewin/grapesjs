import isEditorLive from '../support/isEditorLive.js';

const rebindCanvasDroppable = (editor) => {
  if (!isEditorLive(editor)) return false;
  const canvasModule = editor.Canvas;
  const frameModels = canvasModule && canvasModule.getFrames ? canvasModule.getFrames() : [];
  const wrapperComponent = editor.getWrapper && editor.getWrapper();
  const wrapperElement = wrapperComponent && wrapperComponent.getEl ? wrapperComponent.getEl() : null;
  if (!wrapperElement) return false;
  let reboundCount = 0;
  frameModels.forEach((frameModel) => {
    const frameView = frameModel && frameModel.view;
    const droppable = frameView && frameView.droppable;
    if (!droppable || typeof droppable.toggleEffects !== 'function') return;
    if (droppable.el === wrapperElement) return;
    if (droppable.el && droppable.el.ownerDocument !== wrapperElement.ownerDocument) {
      droppable.toggleEffects(droppable.el, false);
    } else if (droppable.el) {
      droppable.toggleEffects(droppable.el, false);
    }
    droppable.el = wrapperElement;
    droppable.toggleEffects(wrapperElement, true);
    reboundCount += 1;
  });
  return reboundCount > 0;
};

export default rebindCanvasDroppable;
