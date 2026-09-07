import isPlainRecord from '../support/isPlainRecord.js';

const stringifyRecordCanonically = (value) => {
  if (Array.isArray(value)) return '[' + value.map((entry) => stringifyRecordCanonically(entry)).join(',') + ']';
  if (isPlainRecord(value)) {
    const entryTexts = Object.keys(value)
      .sort()
      .map((entryKey) => JSON.stringify(entryKey) + ':' + stringifyRecordCanonically(value[entryKey]));
    return '{' + entryTexts.join(',') + '}';
  }
  return JSON.stringify(value === undefined ? null : value);
};

export default stringifyRecordCanonically;
