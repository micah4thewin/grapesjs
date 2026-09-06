import isPlainRecord from './isPlainRecord.js';

const unsafeKeys = ['__proto__', 'constructor', 'prototype'];

const cloneRecord = (sourceRecord) => {
  const clonedRecord = {};
  Object.keys(sourceRecord).forEach((recordKey) => {
    if (unsafeKeys.indexOf(recordKey) >= 0) return;
    const recordValue = sourceRecord[recordKey];
    clonedRecord[recordKey] = isPlainRecord(recordValue) ? cloneRecord(recordValue) : recordValue;
  });
  return clonedRecord;
};

const deepMergeRecords = (baseRecord, overrideRecord) => {
  if (!isPlainRecord(baseRecord)) return isPlainRecord(overrideRecord) ? cloneRecord(overrideRecord) : overrideRecord;
  if (!isPlainRecord(overrideRecord)) return cloneRecord(baseRecord);
  const mergedRecord = cloneRecord(baseRecord);
  Object.keys(overrideRecord).forEach((overrideKey) => {
    if (unsafeKeys.indexOf(overrideKey) >= 0) return;
    const baseValue = baseRecord[overrideKey];
    const overrideValue = overrideRecord[overrideKey];
    if (isPlainRecord(baseValue) && isPlainRecord(overrideValue)) {
      mergedRecord[overrideKey] = deepMergeRecords(baseValue, overrideValue);
    } else {
      mergedRecord[overrideKey] = isPlainRecord(overrideValue) ? cloneRecord(overrideValue) : overrideValue;
    }
  });
  return mergedRecord;
};

export default deepMergeRecords;
