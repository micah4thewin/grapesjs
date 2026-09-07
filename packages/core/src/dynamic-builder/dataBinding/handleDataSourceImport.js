import describeDataSourceValue from './describeDataSourceValue.js';
import importDataSourceFile from './importDataSourceFile.js';
import noteDataSourcesChange from './noteDataSourcesChange.js';
import renderDataSourceEntry from './renderDataSourceEntry.js';
import showToastNotice from '../support/showToastNotice.js';

const handleDataSourceImport = (editor, formElement, editorState, sourceEntry, fileInput) => {
  const fileObject = fileInput.files && fileInput.files[0];
  if (!fileObject) return;
  importDataSourceFile(fileObject, (importedValue, errorMessage) => {
    fileInput.value = '';
    if (!importedValue) {
      showToastNotice(editor, errorMessage || 'The file could not be imported.', { kind: 'error' });
      return;
    }
    sourceEntry.value = importedValue;
    sourceEntry.mode = 'table';
    renderDataSourceEntry(formElement, editorState, sourceEntry.name, '[data-db-row-add]');
    noteDataSourcesChange(editor, editorState);
    showToastNotice(
      editor,
      `Imported ${describeDataSourceValue(importedValue).toLowerCase()} into ${sourceEntry.name}.`,
      {
        kind: 'success',
      },
    );
  });
};

export default handleDataSourceImport;
