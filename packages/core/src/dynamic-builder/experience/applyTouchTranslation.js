import attachLongPressDrag from './attachLongPressDrag.js';
import hasTouchSupport from './hasTouchSupport.js';

const applyTouchTranslation = (editor, hapticsEnabled) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const ownerDocument = containerElement && containerElement.ownerDocument;
  if (!ownerDocument || !hasTouchSupport(ownerDocument)) return;
  const editorConfig = editor.getConfig && editor.getConfig();
  if (editorConfig) editorConfig.nativeDnD = false;
  attachLongPressDrag(editor, ownerDocument, '.gjs-block, .gjs-layer-move', hapticsEnabled);
};

export default applyTouchTranslation;
