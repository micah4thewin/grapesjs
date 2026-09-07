import isPlainRecord from '../support/isPlainRecord.js';

const describeDataSourceValue = (sourceValue) => {
  if (Array.isArray(sourceValue)) {
    if (!sourceValue.length) return 'No items yet';
    return sourceValue.length === 1 ? '1 item' : `${sourceValue.length} items`;
  }
  if (isPlainRecord(sourceValue)) {
    const fieldCount = Object.keys(sourceValue).length;
    return fieldCount === 1 ? 'Single record, 1 field' : `Single record, ${fieldCount} fields`;
  }
  return 'Empty';
};

export default describeDataSourceValue;
