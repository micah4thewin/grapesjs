import listSymbolRecords from './listSymbolRecords.js';

const resolveUniqueSymbolName = (editor, preferredName) => {
  const usedNames = listSymbolRecords(editor).map((symbolRecord) => String(symbolRecord.name || ''));
  const baseName = String(preferredName || '').trim() || 'Reusable component';
  let uniqueName = baseName;
  let nameSuffix = 2;
  while (usedNames.indexOf(uniqueName) >= 0) {
    uniqueName = baseName + ' ' + nameSuffix;
    nameSuffix += 1;
  }
  return uniqueName;
};

export default resolveUniqueSymbolName;
