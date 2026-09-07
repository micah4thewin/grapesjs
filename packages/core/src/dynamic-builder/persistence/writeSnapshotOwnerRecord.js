import buildSnapshotOwnerKey from './buildSnapshotOwnerKey.js';
import getLocalStorageArea from './getLocalStorageArea.js';
import resolveEditorTabId from './resolveEditorTabId.js';
import resolveStorageKey from './resolveStorageKey.js';

const writeSnapshotOwnerRecord = (editor, moduleOptions, savedAtText) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea) return;
  const ownerRecord = { tabId: resolveEditorTabId(editor), savedAt: String(savedAtText || '') };
  try {
    storageArea.setItem(buildSnapshotOwnerKey(editor, moduleOptions), JSON.stringify(ownerRecord));
  } catch (writeError) {
    return;
  }
  const editorModel = editor.getModel();
  editorModel.set('dbLastKnownStorageKey', resolveStorageKey(editor, moduleOptions));
  editorModel.set('dbLastKnownSavedAt', ownerRecord.savedAt);
};

export default writeSnapshotOwnerRecord;
