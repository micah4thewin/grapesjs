import buildUniqueFieldName from './buildUniqueFieldName.js';
import collectSourceFieldNames from './collectSourceFieldNames.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildBlankItem = (fieldNames) => {
  const blankItem = {};
  fieldNames.forEach((fieldName) => {
    blankItem[fieldName] = '';
  });
  return blankItem;
};

const applyDataSourceRowAction = (sourceEntry, actionName, actionValue) => {
  const rowIndex = parseInt(String(actionValue || ''), 10);
  if (!Array.isArray(sourceEntry.value)) sourceEntry.value = [];
  const sourceItems = sourceEntry.value;
  const fieldNames = collectSourceFieldNames(sourceItems);
  if (actionName === 'row-add') {
    sourceItems.push(buildBlankItem(fieldNames.length ? fieldNames : ['title']));
    return { focusSelector: `[data-db-cell-row="${sourceItems.length - 1}"]` };
  }
  if (actionName === 'row-remove' && sourceItems[rowIndex] !== undefined) {
    sourceItems.splice(rowIndex, 1);
    return { focusSelector: '[data-db-row-add]' };
  }
  if (actionName === 'row-up' || actionName === 'row-down') {
    const targetIndex = actionName === 'row-up' ? rowIndex - 1 : rowIndex + 1;
    if (sourceItems[rowIndex] === undefined || sourceItems[targetIndex] === undefined) return null;
    const movedItem = sourceItems[rowIndex];
    sourceItems[rowIndex] = sourceItems[targetIndex];
    sourceItems[targetIndex] = movedItem;
    return { focusSelector: `[data-db-${actionName}="${targetIndex}"], [data-db-cell-row="${targetIndex}"]` };
  }
  if (actionName === 'field-add') {
    const newFieldName = buildUniqueFieldName(fieldNames);
    if (!sourceItems.length) sourceItems.push({});
    sourceItems.forEach((sourceItem) => {
      if (isPlainRecord(sourceItem)) sourceItem[newFieldName] = '';
    });
    return { focusSelector: `[data-db-field-name="${newFieldName}"]` };
  }
  if (actionName === 'field-remove') {
    sourceItems.forEach((sourceItem) => {
      if (isPlainRecord(sourceItem)) delete sourceItem[String(actionValue)];
    });
    return { focusSelector: '[data-db-field-add]' };
  }
  return null;
};

export default applyDataSourceRowAction;
