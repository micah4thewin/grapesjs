const resolveColumnSyncGuard = (editor) => {
  const editorModel = editor.getModel();
  const existingGuard = editorModel.get('dbColumnSyncGuard');
  if (existingGuard) return existingGuard;
  const syncGuard = new WeakSet();
  editorModel.set('dbColumnSyncGuard', syncGuard);
  return syncGuard;
};

export default resolveColumnSyncGuard;
