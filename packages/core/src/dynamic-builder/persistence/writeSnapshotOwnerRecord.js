import buildSnapshotOwnerKey from './buildSnapshotOwnerKey.js';
import getOwnerBroadcastChannel from './storage/getOwnerBroadcastChannel.js';
import getRecordStorageArea from './storage/getRecordStorageArea.js';
import resolveEditorTabId from './resolveEditorTabId.js';
import resolveStorageKey from './resolveStorageKey.js';

const writeSnapshotOwnerRecord = (editor, moduleOptions, savedAtText) => {
  const storageArea = getRecordStorageArea();
  if (!storageArea) return;
  const ownerRecord = { tabId: resolveEditorTabId(editor), savedAt: String(savedAtText || '') };
  const ownerKey = buildSnapshotOwnerKey(editor, moduleOptions);
  try {
    storageArea.setItem(ownerKey, JSON.stringify(ownerRecord));
  } catch (writeError) {
    return;
  }
  const ownerChannel = getOwnerBroadcastChannel(ownerKey);
  try {
    ownerChannel && ownerChannel.postMessage(ownerRecord);
  } catch (postError) {
    /* a tab that cannot be told just misses the warning */
  }
  const editorModel = editor.getModel();
  editorModel.set('dbLastKnownStorageKey', resolveStorageKey(editor, moduleOptions));
  editorModel.set('dbLastKnownSavedAt', ownerRecord.savedAt);
};

export default writeSnapshotOwnerRecord;
