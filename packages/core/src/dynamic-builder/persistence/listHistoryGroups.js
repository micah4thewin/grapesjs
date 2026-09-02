const listHistoryGroups = (editor) => {
  const undoManager = editor.UndoManager;
  if (!undoManager || typeof undoManager.getGroupedStack !== 'function') return [];
  const selectedCollection = editor.getModel && editor.getModel().get && editor.getModel().get('selected');
  const isSelectionAction = (actionRecord) => actionRecord.object && actionRecord.object === selectedCollection;
  return undoManager
    .getGroupedStack()
    .filter((undoGroup) => (undoGroup.actions || []).some((actionRecord) => !isSelectionAction(actionRecord)));
};

export default listHistoryGroups;
