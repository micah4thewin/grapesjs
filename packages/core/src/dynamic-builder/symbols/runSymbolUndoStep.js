import reserveSymbolUndoGroupIndex from './reserveSymbolUndoGroupIndex.js';
import resolveSymbolUndoStack from './resolveSymbolUndoStack.js';

const runSymbolUndoStep = (editor, stepCallback) => {
  const undoStack = resolveSymbolUndoStack(editor);
  const lastActionBefore = undoStack && undoStack.length ? undoStack.at(undoStack.length - 1) : null;
  const stepResult = stepCallback();
  if (!undoStack) return stepResult;
  const firstStepIndex = lastActionBefore ? undoStack.indexOf(lastActionBefore) + 1 : 0;
  if (firstStepIndex <= 0 && lastActionBefore) return stepResult;
  const stepActions = undoStack.models.slice(firstStepIndex);
  if (!stepActions.length) return stepResult;
  const groupIndex = reserveSymbolUndoGroupIndex(editor);
  stepActions.forEach((actionModel) => actionModel.set('magicFusionIndex', groupIndex));
  return stepResult;
};

export default runSymbolUndoStep;
