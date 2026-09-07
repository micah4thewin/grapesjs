import ensureEditorCanvasFrame from './ensureEditorCanvasFrame.js';
import isEditorLive from '../support/isEditorLive.js';

const prepareEditorCanvasFrame = (editor) => {
  Promise.resolve().then(() => {
    if (!isEditorLive(editor)) return;
    ensureEditorCanvasFrame(editor);
  });
};

export default prepareEditorCanvasFrame;
