import buildSnapshotOwnerKey from './buildSnapshotOwnerKey.js';
import isPlainRecord from '../support/isPlainRecord.js';
import reportForeignSnapshot from './reportForeignSnapshot.js';
import resolveContainerWindow from './resolveContainerWindow.js';
import resolveEditorTabId from './resolveEditorTabId.js';

const wireForeignSnapshotWatch = (editor, moduleOptions, cancelPendingSave) => {
  const containerWindow = resolveContainerWindow(editor);
  if (!containerWindow || typeof containerWindow.addEventListener !== 'function') return;
  const ownerKey = buildSnapshotOwnerKey(moduleOptions);
  const handleStorageEvent = (storageEvent) => {
    if (!storageEvent || storageEvent.key !== ownerKey || !storageEvent.newValue) return;
    let ownerRecord = null;
    try {
      ownerRecord = JSON.parse(storageEvent.newValue);
    } catch (parseError) {
      return;
    }
    if (!isPlainRecord(ownerRecord) || ownerRecord.tabId === resolveEditorTabId(editor)) return;
    cancelPendingSave();
    reportForeignSnapshot(editor, { tabId: String(ownerRecord.tabId || ''), savedAt: String(ownerRecord.savedAt || '') });
  };
  containerWindow.addEventListener('storage', handleStorageEvent);
  editor.on('destroy', () => containerWindow.removeEventListener('storage', handleStorageEvent));
};

export default wireForeignSnapshotWatch;
