import restoreTokenSnapshot from './restoreTokenSnapshot.js';

const registerTokenUndoType = (editor, moduleOptions) => {
  const editorModel = editor.getModel();
  const undoManager = editor.UndoManager;
  if (editorModel.get('dbTokenUndoType') || !undoManager || typeof undoManager.getInstance !== 'function') return;
  const undoInstance = undoManager.getInstance();
  if (!undoInstance || typeof undoInstance.addUndoType !== 'function') return;
  editorModel.set('dbTokenUndoType', true);
  undoInstance.addUndoType('db:design-tokens:step', {
    on: (beforeSnapshot, afterSnapshot, stepLabel) => ({
      object: editorModel,
      before: beforeSnapshot,
      after: afterSnapshot,
      options: { action: stepLabel || 'Design tokens' },
    }),
    undo: (trackedObject, beforeSnapshot) => restoreTokenSnapshot(editor, moduleOptions, beforeSnapshot),
    redo: (trackedObject, beforeSnapshot, afterSnapshot) => restoreTokenSnapshot(editor, moduleOptions, afterSnapshot),
  });
  undoManager.add(editorModel);
};

export default registerTokenUndoType;
