import readSnapshotOwnerRecord from './readSnapshotOwnerRecord.js';
import resolveEditorTabId from './resolveEditorTabId.js';

const detectForeignSnapshot = (editor, moduleOptions) => {
  const ownerRecord = readSnapshotOwnerRecord(moduleOptions);
  if (!ownerRecord || ownerRecord.tabId === resolveEditorTabId(editor)) return null;
  const lastKnownSavedAt = String(editor.getModel().get('dbLastKnownSavedAt') || '');
  return ownerRecord.savedAt > lastKnownSavedAt ? ownerRecord : null;
};

export default detectForeignSnapshot;
