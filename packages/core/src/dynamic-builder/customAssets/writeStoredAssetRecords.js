import writeStoredJsonRecord from '../persistence/writeStoredJsonRecord.js';

const writeStoredAssetRecords = (storageKey, assetRecords) =>
  writeStoredJsonRecord(storageKey, Array.isArray(assetRecords) ? assetRecords : []);

export default writeStoredAssetRecords;
