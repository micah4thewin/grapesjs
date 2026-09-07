import buildCustomIconIdentifier from './buildCustomIconIdentifier.js';
import getCustomIconStorageKey from './getCustomIconStorageKey.js';
import normalizeCustomIconRecord from './normalizeCustomIconRecord.js';
import readStoredAssetRecords from './readStoredAssetRecords.js';
import writeStoredAssetRecords from './writeStoredAssetRecords.js';

const unusableIconMessage = 'That SVG file could not be read, so the icon was not added.';

const readAllIconRecords = () => readStoredAssetRecords(getCustomIconStorageKey(), normalizeCustomIconRecord);

const saveIconRecords = (iconRecords) => writeStoredAssetRecords(getCustomIconStorageKey(), iconRecords);

const createLocalCustomIconAdapter = () => ({
  listIcons: () => Promise.resolve(readAllIconRecords()),
  writeIcon: (iconRecord) => {
    const storedRecords = readAllIconRecords();
    const usedNames = storedRecords.map((storedRecord) => storedRecord.iconName);
    const requestedName = String((iconRecord && iconRecord.iconName) || '');
    const isReplacement = usedNames.indexOf(requestedName) >= 0;
    const iconName = isReplacement
      ? requestedName
      : buildCustomIconIdentifier((iconRecord && iconRecord.label) || '', usedNames);
    const normalizedRecord = normalizeCustomIconRecord({ ...iconRecord, iconName });
    if (!normalizedRecord) return Promise.reject(new Error(unusableIconMessage));
    const keptRecords = storedRecords.filter((storedRecord) => storedRecord.iconName !== normalizedRecord.iconName);
    const writeMessage = saveIconRecords([normalizedRecord, ...keptRecords]);
    return writeMessage ? Promise.reject(new Error(writeMessage)) : Promise.resolve(normalizedRecord);
  },
  deleteIcon: (iconName) => {
    const keptRecords = readAllIconRecords().filter((storedRecord) => storedRecord.iconName !== String(iconName));
    const writeMessage = saveIconRecords(keptRecords);
    return writeMessage ? Promise.reject(new Error(writeMessage)) : Promise.resolve(true);
  },
});

export default createLocalCustomIconAdapter;
