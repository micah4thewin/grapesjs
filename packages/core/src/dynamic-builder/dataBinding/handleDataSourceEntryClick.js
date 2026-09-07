import appendPastedRows from './appendPastedRows.js';
import applyDataSourceObjectAction from './applyDataSourceObjectAction.js';
import applyDataSourceRowAction from './applyDataSourceRowAction.js';
import armDeleteConfirmation from './armDeleteConfirmation.js';
import copyTokenToClipboard from './copyTokenToClipboard.js';
import downloadDataSourceJson from './downloadDataSourceJson.js';
import noteDataSourcesChange from './noteDataSourcesChange.js';
import renderDataSourceEntry from './renderDataSourceEntry.js';
import switchDataSourceMode from './switchDataSourceMode.js';
import showToastNotice from '../support/showToastNotice.js';

const rowActionNames = ['row-add', 'row-remove', 'row-up', 'row-down', 'field-add', 'field-remove'];

const handleDataSourceEntryClick = (editor, formElement, editorState, sourceEntry, entryElement, actionButton) => {
  const readAction = (actionName) => actionButton.closest(`[data-db-${actionName}]`);
  const rerender = (focusSelector) => renderDataSourceEntry(formElement, editorState, sourceEntry.name, focusSelector);
  const rowAction = rowActionNames.find((actionName) => readAction(actionName));
  if (rowAction) {
    const actionResult = applyDataSourceRowAction(
      sourceEntry,
      rowAction,
      readAction(rowAction).getAttribute(`data-db-${rowAction}`),
    );
    if (!actionResult) return;
    noteDataSourcesChange(editor, editorState);
    rerender(actionResult.focusSelector);
    return;
  }
  const objectAction = ['object-add', 'object-remove'].find((actionName) => readAction(actionName));
  if (objectAction) {
    const actionResult = applyDataSourceObjectAction(
      sourceEntry,
      objectAction,
      readAction(objectAction).getAttribute(`data-db-${objectAction}`),
    );
    if (!actionResult) return;
    noteDataSourcesChange(editor, editorState);
    rerender(actionResult.focusSelector);
    return;
  }
  if (readAction('source-mode')) {
    if (
      switchDataSourceMode(sourceEntry, readAction('source-mode').getAttribute('data-db-source-mode'), entryElement)
    ) {
      rerender(sourceEntry.mode === 'json' ? '[data-db-source-json]' : '[data-db-source-mode="table"]');
    }
    return;
  }
  if (readAction('paste-toggle')) {
    sourceEntry.pasteOpen = !sourceEntry.pasteOpen;
    rerender(sourceEntry.pasteOpen ? '[data-db-paste-text]' : '[data-db-paste-toggle]');
    return;
  }
  if (readAction('paste-apply')) {
    const pasteArea = entryElement.querySelector('[data-db-paste-text]');
    const addedCount = appendPastedRows(sourceEntry, pasteArea ? pasteArea.value : '');
    if (!addedCount) {
      showToastNotice(editor, 'No rows found. Paste at least a heading row and one row of values.', { kind: 'error' });
      return;
    }
    sourceEntry.pasteOpen = false;
    noteDataSourcesChange(editor, editorState);
    rerender('[data-db-row-add]');
    showToastNotice(editor, `Added ${addedCount} ${addedCount === 1 ? 'item' : 'items'} to ${sourceEntry.name}.`, {
      kind: 'success',
    });
    return;
  }
  if (readAction('source-import')) {
    const fileInput = entryElement.querySelector('[data-db-source-import-input]');
    if (fileInput) fileInput.click();
    return;
  }
  if (readAction('source-download')) {
    downloadDataSourceJson(sourceEntry.name, sourceEntry.value);
    return;
  }
  if (readAction('source-copy-token')) {
    copyTokenToClipboard(editor, readAction('source-copy-token').getAttribute('data-db-source-copy-token'));
    return;
  }
  if (readAction('source-delete') && armDeleteConfirmation(readAction('source-delete'))) {
    editorState.entries = editorState.entries.filter((candidateEntry) => candidateEntry !== sourceEntry);
    editorState.deletedNames.add(sourceEntry.name);
    entryElement.remove();
    noteDataSourcesChange(editor, editorState);
    const nameInput = formElement.querySelector('[data-db-source-add-name]');
    if (nameInput) nameInput.focus();
  }
};

export default handleDataSourceEntryClick;
