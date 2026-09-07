const resolveSymbolUndoStack = (editor) => {
  const undoManager = editor && editor.UndoManager;
  const undoStack = undoManager && typeof undoManager.getStack === 'function' ? undoManager.getStack() : null;
  return undoStack && typeof undoStack.at === 'function' && Array.isArray(undoStack.models) ? undoStack : null;
};

export default resolveSymbolUndoStack;
