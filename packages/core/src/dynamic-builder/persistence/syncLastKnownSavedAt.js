import readSnapshotOwnerRecord from './readSnapshotOwnerRecord.js';
import resolveStorageKey from './resolveStorageKey.js';

const syncLastKnownSavedAt = (editor, moduleOptions) => {
  const editorModel = editor.getModel();
  const currentKey = resolveStorageKey(editor, moduleOptions);
  if (editorModel.get('dbLastKnownStorageKey') === currentKey) return;
  const ownerRecord = readSnapshotOwnerRecord(editor, moduleOptions);
  editorModel.set('dbLastKnownStorageKey', currentKey);
  editorModel.set('dbLastKnownSavedAt', ownerRecord ? ownerRecord.savedAt : '');
  editorModel.set('dbForeignSnapshotSavedAt', '');
};

export default syncLastKnownSavedAt;
