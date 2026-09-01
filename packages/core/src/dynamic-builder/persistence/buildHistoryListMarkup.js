import describeUndoStackItem from './describeUndoStackItem.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildHistoryListMarkup = (editor) => {
  const undoStack = editor.UndoManager.getStack();
  const stackItems = undoStack && undoStack.models ? [...undoStack.models] : [];
  if (!stackItems.length) {
    return '<p class="gjs-db-muted">No edits yet. Changes you make will appear here.</p>';
  }
  const stackPointer = Number.isFinite(undoStack.pointer) ? undoStack.pointer : stackItems.length - 1;
  const historyRows = stackItems
    .map((stackItem, itemIndex) => {
      const isCurrent = itemIndex === stackPointer;
      const isFuture = itemIndex > stackPointer;
      const stateClass = isCurrent ? ' gjs-db-history-current' : isFuture ? ' gjs-db-history-future' : '';
      const currentBadge = isCurrent ? '<span class="gjs-db-badge gjs-db-badge-success">Current</span>' : '';
      return [
        `<button type="button" class="gjs-db-list-item gjs-db-history-row${stateClass}" data-db-history-index="${itemIndex}">`,
        `<span>${escapeHtmlText(describeUndoStackItem(stackItem))}</span>`,
        currentBadge,
        '</button>',
      ].join('');
    })
    .reverse()
    .join('');
  return `<div class="gjs-db-list" data-db-history-list>${historyRows}</div>`;
};

export default buildHistoryListMarkup;
