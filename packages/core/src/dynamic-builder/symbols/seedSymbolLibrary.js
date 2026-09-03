import getSymbolLibrary from './getSymbolLibrary.js';
import isPlainRecord from '../support/isPlainRecord.js';
import saveSymbolRecord from './saveSymbolRecord.js';

const seedSymbolLibrary = (editor, moduleOptions) => {
  const seededRecords = isPlainRecord(moduleOptions.presets) ? moduleOptions.presets : {};
  const currentLibrary = getSymbolLibrary(editor);
  Object.keys(seededRecords).forEach((symbolId) => {
    if (currentLibrary[symbolId]) return;
    const seededRecord = seededRecords[symbolId];
    if (!isPlainRecord(seededRecord) || !Array.isArray(seededRecord.components)) return;
    saveSymbolRecord(editor, {
      id: symbolId,
      name: String(seededRecord.name || symbolId),
      createdAt: Date.now(),
      components: seededRecord.components,
    });
  });
};

export default seedSymbolLibrary;
