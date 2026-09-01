const jumpToHistoryIndex = (editor, targetIndex) => {
  const undoManager = editor.UndoManager;
  const undoStack = undoManager.getStack();
  const stackLength = undoStack && undoStack.models ? undoStack.models.length : 0;
  if (!stackLength) return;
  let stackPointer = Number.isFinite(undoStack.pointer) ? undoStack.pointer : stackLength - 1;
  let remainingSteps = Math.abs(stackPointer - targetIndex);
  const stepBackward = stackPointer > targetIndex;
  while (remainingSteps > 0) {
    stepBackward ? undoManager.undo(false) : undoManager.redo(false);
    remainingSteps -= 1;
  }
};

export default jumpToHistoryIndex;
