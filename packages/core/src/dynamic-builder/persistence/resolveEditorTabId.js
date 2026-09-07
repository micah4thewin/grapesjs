const resolveEditorTabId = (editor) => {
  const editorModel = editor.getModel();
  const existingTabId = editorModel.get('dbTabId');
  if (existingTabId) return existingTabId;
  const tabId = 'tab-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
  editorModel.set('dbTabId', tabId);
  return tabId;
};

export default resolveEditorTabId;
