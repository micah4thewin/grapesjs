const resolveEditorFromComponent = (component) => {
  const editorModel = component && component.em;
  if (!editorModel || typeof editorModel.getEditor !== 'function') return null;
  return editorModel.getEditor() || null;
};

export default resolveEditorFromComponent;
