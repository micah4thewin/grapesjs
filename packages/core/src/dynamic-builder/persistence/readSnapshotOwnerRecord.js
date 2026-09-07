import buildSnapshotOwnerKey from './buildSnapshotOwnerKey.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from './readStoredJsonRecord.js';

const readSnapshotOwnerRecord = (moduleOptions) => {
  const ownerRecord = readStoredJsonRecord(buildSnapshotOwnerKey(moduleOptions));
  if (!isPlainRecord(ownerRecord) || typeof ownerRecord.tabId !== 'string') return null;
  return { tabId: ownerRecord.tabId, savedAt: String(ownerRecord.savedAt || '') };
};

export default readSnapshotOwnerRecord;
