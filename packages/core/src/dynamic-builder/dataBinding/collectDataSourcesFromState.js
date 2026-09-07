import validateJsonAreaElement from './validateJsonAreaElement.js';

const collectDataSourcesFromState = (editorState, formElement) => {
  const collectedRecord = {};
  let firstInvalidArea = null;
  editorState.entries.forEach((sourceEntry) => {
    if (sourceEntry.mode === 'json') {
      const jsonArea = formElement.querySelector(`[data-db-source-json="${CSS.escape(sourceEntry.name)}"]`);
      const parsedValue = validateJsonAreaElement(jsonArea);
      if (parsedValue === null) {
        if (!firstInvalidArea && jsonArea) firstInvalidArea = jsonArea;
        return;
      }
      sourceEntry.value = parsedValue;
    }
    collectedRecord[sourceEntry.name] = sourceEntry.value;
  });
  editorState.deletedNames.forEach((deletedName) => {
    if (!(deletedName in collectedRecord)) collectedRecord[deletedName] = null;
  });
  if (firstInvalidArea) {
    firstInvalidArea.focus();
    return null;
  }
  return collectedRecord;
};

export default collectDataSourcesFromState;
