const resetUndoHistory = (editor) => {
  const undoManager = editor.UndoManager;
  if (!undoManager || typeof undoManager.clear !== 'function') return false;
  undoManager.clear();
  return true;
};

export default resetUndoHistory;
