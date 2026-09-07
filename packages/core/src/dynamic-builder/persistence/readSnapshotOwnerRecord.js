import buildSnapshotOwnerKey from './buildSnapshotOwnerKey.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from './readStoredJsonRecord.js';

const readSnapshotOwnerRecord = (editor, moduleOptions) => {
  const ownerRecord = readStoredJsonRecord(buildSnapshotOwnerKey(editor, moduleOptions));
  if (!isPlainRecord(ownerRecord) || typeof ownerRecord.tabId !== 'string') return null;
  return { tabId: ownerRecord.tabId, savedAt: String(ownerRecord.savedAt || '') };
};

export default readSnapshotOwnerRecord;
