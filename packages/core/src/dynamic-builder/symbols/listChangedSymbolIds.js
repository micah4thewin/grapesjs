import isPlainRecord from '../support/isPlainRecord.js';

const listChangedSymbolIds = (previousLibrary, nextLibrary) => {
  const previousRecords = isPlainRecord(previousLibrary) ? previousLibrary : {};
  const nextRecords = isPlainRecord(nextLibrary) ? nextLibrary : {};
  return Object.keys({ ...previousRecords, ...nextRecords }).filter(
    (symbolId) => JSON.stringify(previousRecords[symbolId] || null) !== JSON.stringify(nextRecords[symbolId] || null),
  );
};

export default listChangedSymbolIds;
