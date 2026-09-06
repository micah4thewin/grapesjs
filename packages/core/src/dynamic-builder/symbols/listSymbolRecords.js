import getSymbolLibrary from './getSymbolLibrary.js';

const listSymbolRecords = (editorOrModel) => {
  const symbolLibrary = getSymbolLibrary(editorOrModel);
  return Object.keys(symbolLibrary)
    .map((symbolId) => symbolLibrary[symbolId])
    .filter((symbolRecord) => symbolRecord && symbolRecord.id)
    .sort((firstRecord, secondRecord) => String(firstRecord.name).localeCompare(String(secondRecord.name)));
};

export default listSymbolRecords;
