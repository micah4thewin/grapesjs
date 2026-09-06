import deleteSymbolRecord from './deleteSymbolRecord.js';
import getSymbolRecord from './getSymbolRecord.js';
import insertSymbolInstance from './insertSymbolInstance.js';
import insertSymbolOnEveryPage from './insertSymbolOnEveryPage.js';
import listSymbolInstances from './listSymbolInstances.js';
import openSymbolNameModal from './openSymbolNameModal.js';
import registerSymbolBlocks from './registerSymbolBlocks.js';
import saveSymbolRecord from './saveSymbolRecord.js';
import showToastNotice from '../support/showToastNotice.js';

const attachSymbolLibraryHandlers = (editor, libraryElement, libraryCallbacks) => {
  libraryElement.addEventListener('click', (clickEvent) => {
    const actionElement = clickEvent.target.closest('[data-db-symbol-action]');
    if (!actionElement) return;
    clickEvent.preventDefault();
    const actionName = actionElement.getAttribute('data-db-symbol-action');
    const symbolId = actionElement.getAttribute('data-db-symbol-id');
    const symbolRecord = getSymbolRecord(editor, symbolId);
    if (!symbolRecord) return;
    if (actionName === 'insert') {
      editor.Modal.close();
      const instanceComponent = insertSymbolInstance(editor, symbolId);
      if (instanceComponent) editor.select(instanceComponent);
      showToastNotice(editor, '"' + symbolRecord.name + '" added to this page.', { kind: 'success' });
      return;
    }
    if (actionName === 'insert-all') {
      const insertedCount = insertSymbolOnEveryPage(editor, symbolId, { atTop: true });
      showToastNotice(
        editor,
        insertedCount ? 'Added to ' + insertedCount + ' more page(s).' : 'Every page already has it.',
        { kind: 'success' },
      );
      libraryCallbacks.refresh();
      return;
    }
    if (actionName === 'rename') {
      openSymbolNameModal(editor, {
        titleText: 'Rename reusable component',
        submitText: 'Rename',
        helpText: 'Only the name changes. Every copy keeps working.',
        initialName: symbolRecord.name,
        onSubmit: (symbolName) => {
          saveSymbolRecord(editor, { ...symbolRecord, name: symbolName });
          registerSymbolBlocks(editor);
          libraryCallbacks.reopen();
        },
      });
      return;
    }
    if (actionName !== 'delete') return;
    const instanceCount = listSymbolInstances(editor, symbolId).length;
    if (instanceCount && actionElement.getAttribute('data-db-symbol-confirm') !== 'true') {
      actionElement.setAttribute('data-db-symbol-confirm', 'true');
      showToastNotice(editor, 'That is on ' + instanceCount + ' spot(s). Press delete again to remove it everywhere.', {
        kind: 'warning',
      });
      return;
    }
    listSymbolInstances(editor, symbolId).forEach((instanceComponent) => instanceComponent.remove());
    deleteSymbolRecord(editor, symbolId);
    registerSymbolBlocks(editor);
    libraryCallbacks.refresh();
  });
};

export default attachSymbolLibraryHandlers;
