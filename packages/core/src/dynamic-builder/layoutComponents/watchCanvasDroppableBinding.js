import isEditorLive from '../support/isEditorLive.js';
import rebindCanvasDroppable from './rebindCanvasDroppable.js';

const rebindEventNames = 'canvas:frame:load:body load page:select storage:end:load';

const watchCanvasDroppableBinding = (editor) => {
  const scheduleRebind = () => {
    if (!isEditorLive(editor)) return;
    rebindCanvasDroppable(editor);
    setTimeout(() => isEditorLive(editor) && rebindCanvasDroppable(editor), 120);
    setTimeout(() => isEditorLive(editor) && rebindCanvasDroppable(editor), 600);
  };
  editor.on(rebindEventNames, scheduleRebind);
  editor.on('block:drag:start', () => isEditorLive(editor) && rebindCanvasDroppable(editor));
  if (editor.onReady) editor.onReady(scheduleRebind);
};

export default watchCanvasDroppableBinding;
