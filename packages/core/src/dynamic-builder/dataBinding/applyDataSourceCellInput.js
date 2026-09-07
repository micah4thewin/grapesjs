import parseCellTextByKind from './parseCellTextByKind.js';
import isPlainRecord from '../support/isPlainRecord.js';

const applyDataSourceCellInput = (sourceEntry, inputElement) => {
  const cellKind = inputElement.getAttribute('data-db-cell-kind') || 'string';
  const parsedValue = parseCellTextByKind(inputElement.value, cellKind);
  if (inputElement.hasAttribute('data-db-cell-row')) {
    const rowIndex = parseInt(inputElement.getAttribute('data-db-cell-row'), 10);
    const fieldName = inputElement.getAttribute('data-db-cell-field');
    if (!Array.isArray(sourceEntry.value) || !fieldName || Number.isNaN(rowIndex)) return false;
    if (!isPlainRecord(sourceEntry.value[rowIndex])) sourceEntry.value[rowIndex] = {};
    sourceEntry.value[rowIndex][fieldName] = parsedValue;
    return true;
  }
  if (inputElement.hasAttribute('data-db-object-value')) {
    const fieldName = inputElement.getAttribute('data-db-object-value');
    if (!isPlainRecord(sourceEntry.value) || !fieldName) return false;
    sourceEntry.value[fieldName] = parsedValue;
    return true;
  }
  return false;
};

export default applyDataSourceCellInput;
