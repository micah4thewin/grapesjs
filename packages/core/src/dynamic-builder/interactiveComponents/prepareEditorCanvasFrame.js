import ensureComponentTypeViewEvents from '../support/ensureComponentTypeViewEvents.js';
import ensureEditorCanvasFrame from './ensureEditorCanvasFrame.js';
import isEditorLive from '../support/isEditorLive.js';

const prepareEditorCanvasFrame = (editor) => {
  const patchComponentTypeViews = () => ensureComponentTypeViewEvents(editor);
  patchComponentTypeViews();
  editor.on('canvas:frame:load', patchComponentTypeViews);
  Promise.resolve().then(() => {
    if (!isEditorLive(editor)) return;
    patchComponentTypeViews();
    ensureEditorCanvasFrame(editor);
  });
};

export default prepareEditorCanvasFrame;
