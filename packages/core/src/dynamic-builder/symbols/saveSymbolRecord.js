import getSymbolLibrary from './getSymbolLibrary.js';
import writeSymbolLibrary from './writeSymbolLibrary.js';

const saveSymbolRecord = (editor, symbolRecord) => {
  if (!symbolRecord || !symbolRecord.id) return null;
  const storedRecord = { ...symbolRecord, updatedAt: Date.now() };
  writeSymbolLibrary(editor, { ...getSymbolLibrary(editor), [storedRecord.id]: storedRecord });
  return storedRecord;
};

export default saveSymbolRecord;
