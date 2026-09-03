const resolveEditorModel = (editorOrModel) => {
  if (!editorOrModel) return null;
  if (typeof editorOrModel.getModel === 'function') return editorOrModel.getModel();
  if (typeof editorOrModel.get === 'function') return editorOrModel;
  return null;
};

export default resolveEditorModel;
