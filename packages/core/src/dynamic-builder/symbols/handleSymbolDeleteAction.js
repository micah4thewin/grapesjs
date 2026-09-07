import armSymbolDeleteConfirmation from './armSymbolDeleteConfirmation.js';
import deleteSymbolRecord from './deleteSymbolRecord.js';
import listSymbolInstances from './listSymbolInstances.js';
import showToastNotice from '../support/showToastNotice.js';

const handleSymbolDeleteAction = (editor, symbolRecord, actionElement, libraryCallbacks) => {
  const instanceList = listSymbolInstances(editor, symbolRecord.id);
  if (instanceList.length && actionElement.getAttribute('data-db-symbol-confirm') !== 'true') {
    armSymbolDeleteConfirmation(actionElement);
    return;
  }
  instanceList.forEach((instanceComponent) => instanceComponent.remove());
  deleteSymbolRecord(editor, symbolRecord.id);
  libraryCallbacks.refresh();
  const removedText = instanceList.length
    ? ' removed from ' + instanceList.length + (instanceList.length === 1 ? ' place.' : ' places.')
    : ' deleted.';
  showToastNotice(editor, '"' + symbolRecord.name + '"' + removedText + ' Undo brings it back.', { kind: 'success' });
};

export default handleSymbolDeleteAction;
