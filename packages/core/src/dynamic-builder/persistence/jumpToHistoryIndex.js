import listHistoryGroups from './listHistoryGroups.js';

const jumpToHistoryIndex = (editor, targetIndex) => {
  const undoManager = editor.UndoManager;
  if (!undoManager || typeof undoManager.goToGroup !== 'function') return;
  const historyGroups = listHistoryGroups(editor);
  const targetGroup = historyGroups[targetIndex];
  if (!targetGroup) return;
  undoManager.goToGroup(targetGroup);
};

export default jumpToHistoryIndex;
