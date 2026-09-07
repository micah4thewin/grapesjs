import openSymbolNameModal from './openSymbolNameModal.js';
import renameSymbolInstances from './renameSymbolInstances.js';
import saveSymbolRecord from './saveSymbolRecord.js';

const handleSymbolRenameAction = (editor, symbolRecord, libraryCallbacks) => {
  openSymbolNameModal(editor, {
    titleText: 'Rename reusable component',
    submitText: 'Rename',
    helpText: 'Only the name changes. Every copy keeps working.',
    initialName: symbolRecord.name,
    onSubmit: (symbolName) => {
      const savedRecord = saveSymbolRecord(editor, { ...symbolRecord, name: symbolName });
      renameSymbolInstances(editor, savedRecord);
      libraryCallbacks.reopen();
    },
  });
};

export default handleSymbolRenameAction;
