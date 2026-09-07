import validateJsonAreaElement from './validateJsonAreaElement.js';

const switchDataSourceMode = (sourceEntry, nextMode, entryElement) => {
  if (nextMode === 'json') {
    sourceEntry.jsonText = JSON.stringify(sourceEntry.value, null, 2);
    sourceEntry.jsonError = '';
    sourceEntry.mode = 'json';
    return true;
  }
  if (sourceEntry.mode !== 'json') return false;
  const jsonArea = entryElement ? entryElement.querySelector('[data-db-source-json]') : null;
  const parsedValue = validateJsonAreaElement(jsonArea);
  if (parsedValue === null) {
    if (jsonArea) jsonArea.focus();
    return false;
  }
  sourceEntry.value = parsedValue;
  sourceEntry.jsonError = '';
  sourceEntry.mode = 'table';
  return true;
};

export default switchDataSourceMode;
