const markEditorChanged = (editor, changeData) => {
  const editorModel = editor && editor.getModel ? editor.getModel() : null;
  if (!editorModel || typeof editorModel.changesUp !== 'function') return;
  editorModel.changesUp({}, changeData || {});
  if (editorModel.loadTriggered) return;
  const currentCount = typeof editorModel.getDirtyCount === 'function' ? editorModel.getDirtyCount() || 0 : 0;
  editorModel.set('changesCount', currentCount + 1);
};

export default markEditorChanged;
