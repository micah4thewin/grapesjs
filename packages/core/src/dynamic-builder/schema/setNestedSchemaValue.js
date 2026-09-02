import isPlainRecord from '../support/isPlainRecord.js';

const unsafeKeyParts = ['__proto__', 'constructor', 'prototype'];

const setNestedSchemaValue = (targetRecord, dottedKey, fieldValue) => {
  const keyParts = String(dottedKey || '')
    .split('.')
    .filter(Boolean);
  if (!keyParts.length) return;
  if (keyParts.some((keyPart) => unsafeKeyParts.indexOf(keyPart) >= 0)) return;
  let cursorRecord = targetRecord;
  keyParts.slice(0, -1).forEach((keyPart) => {
    const hasOwnRecord =
      Object.prototype.hasOwnProperty.call(cursorRecord, keyPart) && isPlainRecord(cursorRecord[keyPart]);
    if (!hasOwnRecord) cursorRecord[keyPart] = {};
    cursorRecord = cursorRecord[keyPart];
  });
  cursorRecord[keyParts[keyParts.length - 1]] = fieldValue;
};

export default setNestedSchemaValue;
