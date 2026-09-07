import formatBindingValue from './formatBindingValue.js';
import getDataSourceRegistry from './getDataSourceRegistry.js';
import listDataSourceNames from './listDataSourceNames.js';
import resolveComponentBindingContext from './resolveComponentBindingContext.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildEntry = (groupLabel, tokenPath, fieldLabel, sampleValue) => ({
  group: groupLabel,
  token: `{{db:${tokenPath}}}`,
  label: fieldLabel,
  sample: formatBindingValue(sampleValue, '').slice(0, 80),
});

const listRecordEntries = (groupLabel, pathPrefix, sourceRecord) =>
  Object.keys(isPlainRecord(sourceRecord) ? sourceRecord : {})
    .filter((fieldName) => !isPlainRecord(sourceRecord[fieldName]) && !Array.isArray(sourceRecord[fieldName]))
    .map((fieldName) => buildEntry(groupLabel, `${pathPrefix}.${fieldName}`, fieldName, sourceRecord[fieldName]));

const collectFieldPickerEntries = (editor, contextComponent) => {
  const registryRecord = getDataSourceRegistry(editor);
  const pickerEntries = [];
  const contextRegistry = contextComponent ? resolveComponentBindingContext(editor, contextComponent) : null;
  if (contextRegistry && isPlainRecord(contextRegistry.item)) {
    pickerEntries.push(...listRecordEntries('This repeater item', 'item', contextRegistry.item));
    pickerEntries.push(buildEntry('This repeater item', 'index', 'Item number', contextRegistry.index));
    pickerEntries.push(buildEntry('This repeater item', 'count', 'Number of items', contextRegistry.count));
  }
  listDataSourceNames(editor).forEach((sourceName) => {
    const sourceValue = registryRecord[sourceName];
    if (Array.isArray(sourceValue)) {
      const firstRecord = sourceValue.find((sourceItem) => isPlainRecord(sourceItem));
      pickerEntries.push(...listRecordEntries(`${sourceName} (first item)`, `${sourceName}.0`, firstRecord));
      return;
    }
    pickerEntries.push(...listRecordEntries(sourceName, sourceName, sourceValue));
  });
  return pickerEntries;
};

export default collectFieldPickerEntries;
