const wireHistoryButtons = (editor, stripElement) => {
  const undoButton = stripElement.querySelector('[data-db-command="core:undo"]');
  const redoButton = stripElement.querySelector('[data-db-command="core:redo"]');
  if (!undoButton || !redoButton) return;
  const undoManager = editor.UndoManager;
  const refreshHistoryStates = () => {
    undoButton.disabled = !undoManager.hasUndo();
    redoButton.disabled = !undoManager.hasRedo();
  };
  const changeStack = undoManager.getStack && undoManager.getStack();
  if (changeStack && changeStack.on) changeStack.on('add remove reset', refreshHistoryStates);
  editor.on('undo redo update', refreshHistoryStates);
  refreshHistoryStates();
};

export default wireHistoryButtons;
