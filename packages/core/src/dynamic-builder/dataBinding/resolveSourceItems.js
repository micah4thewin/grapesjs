import isPlainRecord from '../support/isPlainRecord.js';

const resolveSourceItems = (sourceValue) => {
  if (Array.isArray(sourceValue)) return sourceValue;
  if (isPlainRecord(sourceValue)) return [sourceValue];
  return [];
};

export default resolveSourceItems;
