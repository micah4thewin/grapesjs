import isPlainRecord from '../support/isPlainRecord.js';

const renameRecordKey = (sourceRecord, oldName, newName) => {
  const renamedRecord = {};
  Object.keys(sourceRecord).forEach((fieldName) => {
    renamedRecord[fieldName === oldName ? newName : fieldName] = sourceRecord[fieldName];
  });
  return renamedRecord;
};

const renameDataSourceField = (sourceEntry, oldName, newName) => {
  const cleanName = String(newName || '')
    .trim()
    .replace(/[^A-Za-z0-9_-]/g, '');
  if (!cleanName || cleanName === oldName) return false;
  if (Array.isArray(sourceEntry.value)) {
    const hasCollision = sourceEntry.value.some((sourceItem) => isPlainRecord(sourceItem) && cleanName in sourceItem);
    if (hasCollision) return false;
    sourceEntry.value = sourceEntry.value.map((sourceItem) =>
      isPlainRecord(sourceItem) && oldName in sourceItem ? renameRecordKey(sourceItem, oldName, cleanName) : sourceItem,
    );
    return true;
  }
  if (!isPlainRecord(sourceEntry.value) || cleanName in sourceEntry.value) return false;
  sourceEntry.value = renameRecordKey(sourceEntry.value, oldName, cleanName);
  return true;
};

export default renameDataSourceField;
