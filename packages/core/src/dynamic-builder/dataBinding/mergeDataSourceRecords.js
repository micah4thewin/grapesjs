import isPlainRecord from '../support/isPlainRecord.js';

const unsafeNames = ['__proto__', 'constructor', 'prototype'];

const mergeDataSourceRecords = (baseRecord, overrideRecord) => {
  const mergedRecord = {};
  const safeBase = isPlainRecord(baseRecord) ? baseRecord : {};
  const safeOverride = isPlainRecord(overrideRecord) ? overrideRecord : {};
  Object.keys(safeBase).forEach((sourceName) => {
    if (unsafeNames.indexOf(sourceName) >= 0) return;
    mergedRecord[sourceName] = safeBase[sourceName];
  });
  Object.keys(safeOverride).forEach((sourceName) => {
    if (unsafeNames.indexOf(sourceName) >= 0) return;
    const overrideValue = safeOverride[sourceName];
    if (overrideValue === null) delete mergedRecord[sourceName];
    else mergedRecord[sourceName] = overrideValue;
  });
  return mergedRecord;
};

export default mergeDataSourceRecords;
