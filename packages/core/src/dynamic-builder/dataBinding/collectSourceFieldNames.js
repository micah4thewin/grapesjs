import isPlainRecord from '../support/isPlainRecord.js';

const collectSourceFieldNames = (sourceItems) => {
  const fieldNames = [];
  (Array.isArray(sourceItems) ? sourceItems : []).forEach((sourceItem) => {
    if (!isPlainRecord(sourceItem)) return;
    Object.keys(sourceItem).forEach((fieldName) => {
      if (fieldNames.indexOf(fieldName) < 0) fieldNames.push(fieldName);
    });
  });
  return fieldNames;
};

export default collectSourceFieldNames;
