import getSymbolLibrary from './getSymbolLibrary.js';
import writeSymbolLibrary from './writeSymbolLibrary.js';

const deleteSymbolRecord = (editor, symbolId) => {
  const currentLibrary = getSymbolLibrary(editor);
  const nextLibrary = {};
  Object.keys(currentLibrary).forEach((currentId) => {
    if (currentId === String(symbolId)) return;
    nextLibrary[currentId] = currentLibrary[currentId];
  });
  return writeSymbolLibrary(editor, nextLibrary);
};

export default deleteSymbolRecord;
