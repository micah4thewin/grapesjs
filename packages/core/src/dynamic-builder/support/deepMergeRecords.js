import isPlainRecord from './isPlainRecord.js';

const deepMergeRecords = (baseRecord, overrideRecord) => {
  if (!isPlainRecord(baseRecord)) return isPlainRecord(overrideRecord) ? { ...overrideRecord } : overrideRecord;
  if (!isPlainRecord(overrideRecord)) return { ...baseRecord };
  const mergedRecord = { ...baseRecord };
  Object.keys(overrideRecord).forEach((overrideKey) => {
    const baseValue = baseRecord[overrideKey];
    const overrideValue = overrideRecord[overrideKey];
    mergedRecord[overrideKey] =
      isPlainRecord(baseValue) && isPlainRecord(overrideValue)
        ? deepMergeRecords(baseValue, overrideValue)
        : overrideValue;
  });
  return mergedRecord;
};

export default deepMergeRecords;
