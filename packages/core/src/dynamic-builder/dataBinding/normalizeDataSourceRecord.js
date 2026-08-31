import isPlainRecord from '../support/isPlainRecord.js';

const normalizeDataSourceRecord = (sourcesRecord) => {
  const normalizedRecord = {};
  if (!isPlainRecord(sourcesRecord)) return normalizedRecord;
  Object.keys(sourcesRecord).forEach((sourceName) => {
    const sourceValue = sourcesRecord[sourceName];
    if (isPlainRecord(sourceValue) || Array.isArray(sourceValue)) normalizedRecord[sourceName] = sourceValue;
  });
  return normalizedRecord;
};

export default normalizeDataSourceRecord;
