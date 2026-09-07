import captureTokenSnapshot from './captureTokenSnapshot.js';

const trackTokenUndoStep = (editor, beforeSnapshot, stepLabel) => {
  const afterSnapshot = captureTokenSnapshot(editor);
  if (JSON.stringify(beforeSnapshot) === JSON.stringify(afterSnapshot)) return false;
  editor.getModel().trigger('db:design-tokens:step', beforeSnapshot, afterSnapshot, stepLabel || 'Design tokens');
  return true;
};

export default trackTokenUndoStep;
