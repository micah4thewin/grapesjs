const markEditorChanged = (editor, changeData) => {
  const editorModel = editor && editor.getModel ? editor.getModel() : null;
  if (!editorModel || typeof editorModel.changesUp !== 'function') return;
  editorModel.changesUp({}, changeData || {});
};

export default markEditorChanged;
