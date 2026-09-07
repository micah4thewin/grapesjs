import getLocalStorageArea from '../persistence/getLocalStorageArea.js';
import isPlainRecord from '../support/isPlainRecord.js';
import readStoredJsonRecord from '../persistence/readStoredJsonRecord.js';
import writeStoredJsonRecord from '../persistence/writeStoredJsonRecord.js';

const siteIndexStorageKey = 'db-sites:index';
const siteOwnerStorageKey = 'db-sites:user';

const readIndexRecords = () => {
  const indexRecord = readStoredJsonRecord(siteIndexStorageKey);
  return isPlainRecord(indexRecord) && Array.isArray(indexRecord.sites) ? indexRecord.sites.filter(isPlainRecord) : [];
};

const writeIndexRecords = (siteRecords) =>
  writeStoredJsonRecord(siteIndexStorageKey, { sites: siteRecords, updatedAt: new Date().toISOString() }) === null;

const mergeIndexRecord = (siteRecords, siteRecord) =>
  siteRecords.some((storedRecord) => storedRecord.id === siteRecord.id)
    ? siteRecords.map((storedRecord) => (storedRecord.id === siteRecord.id ? siteRecord : storedRecord))
    : siteRecords.concat([siteRecord]);

const removeStoredKey = (storageKey) => {
  const storageArea = getLocalStorageArea();
  if (!storageArea || !storageKey) return false;
  try {
    storageArea.removeItem(storageKey);
    return true;
  } catch (removeError) {
    return false;
  }
};

const createLocalStorageSiteAdapter = () => ({
  listSites: () => Promise.resolve(readIndexRecords()),
  readSite: (siteId) => {
    const siteRecord = readIndexRecords().find((storedRecord) => storedRecord.id === siteId) || null;
    if (!siteRecord) return Promise.resolve(null);
    return Promise.resolve({ record: siteRecord, snapshot: readStoredJsonRecord(siteRecord.storageKey) });
  },
  writeSite: (siteRecord, projectSnapshot) => {
    if (!isPlainRecord(siteRecord) || !siteRecord.id) return Promise.resolve(false);
    const snapshotSaved = isPlainRecord(projectSnapshot)
      ? writeStoredJsonRecord(siteRecord.storageKey, projectSnapshot) === null
      : true;
    const indexSaved = writeIndexRecords(mergeIndexRecord(readIndexRecords(), siteRecord));
    return Promise.resolve(indexSaved && snapshotSaved);
  },
  deleteSite: (siteId) => {
    const siteRecord = readIndexRecords().find((storedRecord) => storedRecord.id === siteId) || null;
    if (siteRecord) {
      removeStoredKey(siteRecord.storageKey);
      removeStoredKey(siteRecord.storageKey + ':owner');
    }
    return Promise.resolve(writeIndexRecords(readIndexRecords().filter((storedRecord) => storedRecord.id !== siteId)));
  },
  readUser: () => {
    const ownerRecord = readStoredJsonRecord(siteOwnerStorageKey);
    return Promise.resolve(isPlainRecord(ownerRecord) ? ownerRecord : null);
  },
  writeUser: (ownerRecord) =>
    Promise.resolve(
      isPlainRecord(ownerRecord) ? writeStoredJsonRecord(siteOwnerStorageKey, ownerRecord) === null : false,
    ),
});

export default createLocalStorageSiteAdapter;
