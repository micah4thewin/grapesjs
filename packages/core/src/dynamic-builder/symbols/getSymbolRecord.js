import getSymbolLibrary from './getSymbolLibrary.js';
import isPlainRecord from '../support/isPlainRecord.js';

const getSymbolRecord = (editorOrModel, symbolId) => {
  const symbolRecord = getSymbolLibrary(editorOrModel)[String(symbolId || '')];
  return isPlainRecord(symbolRecord) ? symbolRecord : null;
};

export default getSymbolRecord;
