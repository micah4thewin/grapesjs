import getCustomFontStorageKey from './getCustomFontStorageKey.js';
import normalizeCustomFontRecord from './normalizeCustomFontRecord.js';
import readStoredAssetRecords from './readStoredAssetRecords.js';
import writeStoredAssetRecords from './writeStoredAssetRecords.js';

const unreadableFontMessage = 'That font file could not be read. Use a woff2, woff, ttf or otf file.';

const readAllFontRecords = () => readStoredAssetRecords(getCustomFontStorageKey(), normalizeCustomFontRecord);

const saveFontRecords = (fontRecords) => writeStoredAssetRecords(getCustomFontStorageKey(), fontRecords);

const createLocalCustomFontAdapter = () => ({
  listFonts: () => Promise.resolve(readAllFontRecords()),
  writeFont: (fontRecord) => {
    const normalizedRecord = normalizeCustomFontRecord(fontRecord);
    if (!normalizedRecord) return Promise.reject(new Error(unreadableFontMessage));
    const keptRecords = readAllFontRecords().filter((storedRecord) => storedRecord.fontId !== normalizedRecord.fontId);
    const writeMessage = saveFontRecords([normalizedRecord, ...keptRecords]);
    return writeMessage ? Promise.reject(new Error(writeMessage)) : Promise.resolve(normalizedRecord);
  },
  deleteFont: (fontId) => {
    const keptRecords = readAllFontRecords().filter((storedRecord) => storedRecord.fontId !== String(fontId));
    const writeMessage = saveFontRecords(keptRecords);
    return writeMessage ? Promise.reject(new Error(writeMessage)) : Promise.resolve(true);
  },
});

export default createLocalCustomFontAdapter;
