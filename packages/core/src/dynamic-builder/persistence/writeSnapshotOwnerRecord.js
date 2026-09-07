import buildSnapshotOwnerKey from './buildSnapshotOwnerKey.js';
import getLocalStorageArea from './getLocalStorageArea.js';
import resolveEditorTabId from './resolveEditorTabId.js';

const writeSnapshotOwnerRecord = (editor, moduleOptions, savedAtText) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return;
  const ownerRecord = { tabId: resolveEditorTabId(editor), savedAt: String(savedAtText || '') };
  try {
    storageArea.setItem(buildSnapshotOwnerKey(moduleOptions), JSON.stringify(ownerRecord));
  } catch (writeError) {
    return;
  }
  editor.getModel().set('dbLastKnownSavedAt', ownerRecord.savedAt);
};

export default writeSnapshotOwnerRecord;
