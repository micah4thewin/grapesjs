import escapeSelectorValue from './escapeSelectorValue.js';
import applyDataSourceRowAction from './applyDataSourceRowAction.js';
import noteDataSourcesChange from './noteDataSourcesChange.js';
import renderDataSourceEntry from './renderDataSourceEntry.js';

const handleDataSourceCellKeydown = (editor, formElement, editorState, sourceEntry, cellInput) => {
  const rowIndex = parseInt(cellInput.getAttribute('data-db-cell-row'), 10);
  const fieldName = cellInput.getAttribute('data-db-cell-field');
  if (Number.isNaN(rowIndex) || !fieldName) return;
  const nextSelector = `[data-db-cell-row="${rowIndex + 1}"][data-db-cell-field="${escapeSelectorValue(fieldName)}"]`;
  const nextInput = formElement.querySelector(
    `[data-db-source-entry="${escapeSelectorValue(sourceEntry.name)}"] ${nextSelector}`,
  );
  if (nextInput) {
    nextInput.focus();
    return;
  }
  applyDataSourceRowAction(sourceEntry, 'row-add', '');
  noteDataSourcesChange(editor, editorState);
  renderDataSourceEntry(formElement, editorState, sourceEntry.name, nextSelector);
};

export default handleDataSourceCellKeydown;
