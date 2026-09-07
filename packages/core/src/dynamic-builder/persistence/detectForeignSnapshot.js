import readSnapshotOwnerRecord from './readSnapshotOwnerRecord.js';
import resolveEditorTabId from './resolveEditorTabId.js';
import syncLastKnownSavedAt from './syncLastKnownSavedAt.js';

const detectForeignSnapshot = (editor, moduleOptions) => {
  syncLastKnownSavedAt(editor, moduleOptions);
  const ownerRecord = readSnapshotOwnerRecord(editor, moduleOptions);
  if (!ownerRecord || ownerRecord.tabId === resolveEditorTabId(editor)) return null;
  const lastKnownSavedAt = String(editor.getModel().get('dbLastKnownSavedAt') || '');
  return ownerRecord.savedAt > lastKnownSavedAt ? ownerRecord : null;
};

export default detectForeignSnapshot;
