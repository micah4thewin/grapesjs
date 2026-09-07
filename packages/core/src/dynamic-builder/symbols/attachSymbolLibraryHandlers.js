import getSymbolRecord from './getSymbolRecord.js';
import handleSymbolDeleteAction from './handleSymbolDeleteAction.js';
import handleSymbolInsertAction from './handleSymbolInsertAction.js';
import handleSymbolInsertAllAction from './handleSymbolInsertAllAction.js';
import handleSymbolRenameAction from './handleSymbolRenameAction.js';

const attachSymbolLibraryHandlers = (editor, libraryElement, libraryCallbacks) => {
  libraryElement.addEventListener('click', (clickEvent) => {
    const actionElement = clickEvent.target.closest('[data-db-symbol-action]');
    if (!actionElement) return;
    clickEvent.preventDefault();
    const actionName = actionElement.getAttribute('data-db-symbol-action');
    const symbolRecord = getSymbolRecord(editor, actionElement.getAttribute('data-db-symbol-id'));
    if (!symbolRecord) return;
    if (actionName === 'insert') handleSymbolInsertAction(editor, symbolRecord);
    else if (actionName === 'insert-all') handleSymbolInsertAllAction(editor, symbolRecord, libraryCallbacks);
    else if (actionName === 'rename') handleSymbolRenameAction(editor, symbolRecord, libraryCallbacks);
    else if (actionName === 'delete') handleSymbolDeleteAction(editor, symbolRecord, actionElement, libraryCallbacks);
  });
};

export default attachSymbolLibraryHandlers;
