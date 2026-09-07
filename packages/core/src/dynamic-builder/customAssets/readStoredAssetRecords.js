import readStoredJsonRecord from '../persistence/readStoredJsonRecord.js';

const readStoredAssetRecords = (storageKey, normalizeRecord) => {
  const storedList = readStoredJsonRecord(storageKey);
  if (!Array.isArray(storedList)) return [];
  return storedList.map((storedRecord) => normalizeRecord(storedRecord)).filter(Boolean);
};

export default readStoredAssetRecords;
