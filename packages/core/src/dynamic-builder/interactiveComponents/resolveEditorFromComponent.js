const resolveEditorFromComponent = (component) => {
  const editorModel = component && component.em;
  return editorModel && typeof editorModel.get === 'function' ? editorModel.get('Editor') || null : null;
};

export default resolveEditorFromComponent;
