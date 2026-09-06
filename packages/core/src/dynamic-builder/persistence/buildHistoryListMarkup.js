import describeUndoGroup from './describeUndoGroup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import listHistoryGroups from './listHistoryGroups.js';

const buildHistoryListMarkup = (editor) => {
  const historyGroups = listHistoryGroups(editor);
  if (!historyGroups.length) {
    return '<p class="gjs-db-muted">No edits yet. Changes you make will appear here.</p>';
  }
  const undoManager = editor.UndoManager;
  const currentPointer = typeof undoManager.getPointer === 'function' ? undoManager.getPointer() : 0;
  const historyRows = historyGroups
    .map((undoGroup, groupIndex) => {
      const isCurrent = undoGroup.index === currentPointer - 1 || (currentPointer === 0 && groupIndex === 0);
      const isFuture = undoGroup.index >= currentPointer;
      const stateClass = isCurrent ? ' gjs-db-history-current' : isFuture ? ' gjs-db-history-future' : '';
      const currentBadge = isCurrent ? '<span class="gjs-db-badge gjs-db-badge-success">Current</span>' : '';
      return [
        '<button type="button" class="gjs-db-list-item gjs-db-history-row' + stateClass + '"',
        ' data-db-history-index="' + groupIndex + '">',
        '<span>' + escapeHtmlText(describeUndoGroup(undoGroup)) + '</span>',
        currentBadge,
        '</button>',
      ].join('');
    })
    .reverse()
    .join('');
  return '<div class="gjs-db-list" data-db-history-list>' + historyRows + '</div>';
};

export default buildHistoryListMarkup;
