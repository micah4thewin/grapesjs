import buildSnapshotOwnerKey from './buildSnapshotOwnerKey.js';
import getOwnerBroadcastChannel from './storage/getOwnerBroadcastChannel.js';
import isPlainRecord from '../support/isPlainRecord.js';
import reportForeignSnapshot from './reportForeignSnapshot.js';
import resolveContainerWindow from './resolveContainerWindow.js';
import resolveEditorTabId from './resolveEditorTabId.js';

const wireForeignSnapshotWatch = (editor, moduleOptions, cancelPendingSave) => {
  const containerWindow = resolveContainerWindow(editor);
  if (!containerWindow || typeof containerWindow.addEventListener !== 'function') return;
  const ownerKey = buildSnapshotOwnerKey(editor, moduleOptions);
  const handleOwnerRecord = (ownerRecord) => {
    if (!isPlainRecord(ownerRecord) || ownerRecord.tabId === resolveEditorTabId(editor)) return;
    cancelPendingSave();
    reportForeignSnapshot(editor, {
      tabId: String(ownerRecord.tabId || ''),
      savedAt: String(ownerRecord.savedAt || ''),
    });
  };
  const handleChannelMessage = (channelEvent) => handleOwnerRecord(channelEvent && channelEvent.data);
  // The storage event still covers the browsers where records fall back to
  // localStorage; BroadcastChannel covers the IndexedDB path.
  const handleStorageEvent = (storageEvent) => {
    if (!storageEvent || !storageEvent.newValue || storageEvent.key !== ownerKey) return;
    try {
      handleOwnerRecord(JSON.parse(storageEvent.newValue));
    } catch (parseError) {
      /* a record we cannot read tells us nothing */
    }
  };
  const ownerChannel = getOwnerBroadcastChannel(ownerKey);
  if (ownerChannel) ownerChannel.addEventListener('message', handleChannelMessage);
  containerWindow.addEventListener('storage', handleStorageEvent);
  editor.on('destroy', () => {
    if (ownerChannel) ownerChannel.removeEventListener('message', handleChannelMessage);
    containerWindow.removeEventListener('storage', handleStorageEvent);
  });
};

export default wireForeignSnapshotWatch;
