import isPlainRecord from '../support/isPlainRecord.js';

const setNestedSchemaValue = (targetRecord, dottedKey, fieldValue) => {
  const keyParts = String(dottedKey || '')
    .split('.')
    .filter(Boolean);
  if (!keyParts.length) return;
  let cursorRecord = targetRecord;
  keyParts.slice(0, -1).forEach((keyPart) => {
    if (!isPlainRecord(cursorRecord[keyPart])) cursorRecord[keyPart] = {};
    cursorRecord = cursorRecord[keyPart];
  });
  cursorRecord[keyParts[keyParts.length - 1]] = fieldValue;
};

export default setNestedSchemaValue;
