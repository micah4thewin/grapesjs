const isEditorLive = (editor) => {
  if (!editor || typeof editor.getModel !== 'function') return false;
  const editorModel = editor.getModel();
  return Boolean(editorModel) && editorModel.destroyed !== true;
};

export default isEditorLive;
