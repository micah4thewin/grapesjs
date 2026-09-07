import buildUniqueFieldName from './buildUniqueFieldName.js';
import isPlainRecord from '../support/isPlainRecord.js';

const applyDataSourceObjectAction = (sourceEntry, actionName, actionValue) => {
  if (!isPlainRecord(sourceEntry.value)) sourceEntry.value = {};
  if (actionName === 'object-add') {
    const newFieldName = buildUniqueFieldName(Object.keys(sourceEntry.value));
    sourceEntry.value[newFieldName] = '';
    return { focusSelector: `[data-db-object-key="${newFieldName}"]` };
  }
  if (actionName === 'object-remove') {
    delete sourceEntry.value[String(actionValue)];
    return { focusSelector: '[data-db-object-add]' };
  }
  return null;
};

export default applyDataSourceObjectAction;
