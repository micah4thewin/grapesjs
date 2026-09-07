import resolveEditorModel from './resolveEditorModel.js';

const reserveSymbolUndoGroupIndex = (editor) => {
  const editorModel = resolveEditorModel(editor);
  if (!editorModel) return -2;
  const nextGroupIndex = Number(editorModel.get('dbSymbolUndoGroup') || -1) - 1;
  editorModel.set('dbSymbolUndoGroup', nextGroupIndex, { avoidStore: true });
  return nextGroupIndex;
};

export default reserveSymbolUndoGroupIndex;
