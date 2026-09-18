import isPlainRecord from './isPlainRecord.js';

const mapDeepStrings = (sourceValue, mapStringText) => {
  if (typeof sourceValue === 'string') return mapStringText(sourceValue);
  if (Array.isArray(sourceValue)) return sourceValue.map((itemValue) => mapDeepStrings(itemValue, mapStringText));
  if (!isPlainRecord(sourceValue)) return sourceValue;
  const mappedRecord = {};
  Object.keys(sourceValue).forEach((recordKey) => {
    mappedRecord[recordKey] = mapDeepStrings(sourceValue[recordKey], mapStringText);
  });
  return mappedRecord;
};

export default mapDeepStrings;
