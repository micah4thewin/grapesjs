import applyDataSourceCellInput from './applyDataSourceCellInput.js';
import noteDataSourcesChange from './noteDataSourcesChange.js';
import validateJsonAreaElement from './validateJsonAreaElement.js';

const handleDataSourceEntryInput = (editor, editorState, sourceEntry, inputElement) => {
  if (inputElement.hasAttribute('data-db-source-json')) {
    sourceEntry.jsonText = inputElement.value;
    const parsedValue = validateJsonAreaElement(inputElement);
    sourceEntry.jsonError = parsedValue === null ? 'invalid' : '';
    if (parsedValue === null) return;
    sourceEntry.value = parsedValue;
    noteDataSourcesChange(editor, editorState);
    return;
  }
  if (applyDataSourceCellInput(sourceEntry, inputElement)) noteDataSourcesChange(editor, editorState);
};

export default handleDataSourceEntryInput;
