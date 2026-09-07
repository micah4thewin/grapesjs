import addDataSourceEntry from './addDataSourceEntry.js';
import findDataSourceEntry from './findDataSourceEntry.js';
import handleDataSourceCellKeydown from './handleDataSourceCellKeydown.js';
import handleDataSourceEntryClick from './handleDataSourceEntryClick.js';
import handleDataSourceEntryInput from './handleDataSourceEntryInput.js';
import handleDataSourceImport from './handleDataSourceImport.js';
import noteDataSourcesChange from './noteDataSourcesChange.js';
import renameDataSourceField from './renameDataSourceField.js';
import renderDataSourceEntry from './renderDataSourceEntry.js';
import saveDataSourcesFromModal from './saveDataSourcesFromModal.js';
import updateAddSourceHint from './updateAddSourceHint.js';

const attachDataSourcesModalHandlers = (editor, formElement, editorState) => {
  const resolveEntry = (targetElement) => {
    const entryElement =
      targetElement && targetElement.closest ? targetElement.closest('[data-db-source-entry]') : null;
    const sourceEntry = entryElement
      ? findDataSourceEntry(editorState, entryElement.getAttribute('data-db-source-entry'))
      : null;
    return { entryElement, sourceEntry };
  };
  formElement.addEventListener('submit', (submitEvent) => submitEvent.preventDefault());
  formElement.addEventListener('input', (inputEvent) => {
    const targetElement = inputEvent.target;
    if (targetElement.hasAttribute('data-db-source-add-name')) {
      updateAddSourceHint(formElement);
      return;
    }
    const { sourceEntry } = resolveEntry(targetElement);
    if (sourceEntry) handleDataSourceEntryInput(editor, editorState, sourceEntry, targetElement);
  });
  formElement.addEventListener('change', (changeEvent) => {
    const targetElement = changeEvent.target;
    const { sourceEntry } = resolveEntry(targetElement);
    if (!sourceEntry) return;
    if (targetElement.hasAttribute('data-db-source-import-input')) {
      handleDataSourceImport(editor, formElement, editorState, sourceEntry, targetElement);
      return;
    }
    const renameAttribute = ['data-db-field-name', 'data-db-object-key'].find((name) =>
      targetElement.hasAttribute(name),
    );
    if (!renameAttribute) return;
    const oldName = targetElement.getAttribute(renameAttribute);
    const renamed = renameDataSourceField(sourceEntry, oldName, targetElement.value);
    if (renamed) noteDataSourcesChange(editor, editorState);
    const focusName = renamed ? targetElement.value.trim().replace(/[^A-Za-z0-9_-]/g, '') : oldName;
    renderDataSourceEntry(formElement, editorState, sourceEntry.name, `[${renameAttribute}="${focusName}"]`);
  });
  formElement.addEventListener('keydown', (keyEvent) => {
    if (keyEvent.key !== 'Enter' || keyEvent.target.tagName === 'TEXTAREA') return;
    const targetElement = keyEvent.target;
    if (targetElement.hasAttribute('data-db-source-add-name')) {
      keyEvent.preventDefault();
      addDataSourceEntry(formElement, editorState);
      return;
    }
    const { sourceEntry } = resolveEntry(targetElement);
    if (sourceEntry && targetElement.hasAttribute('data-db-cell-row')) {
      keyEvent.preventDefault();
      handleDataSourceCellKeydown(editor, formElement, editorState, sourceEntry, targetElement);
    }
  });
  formElement.addEventListener('click', (clickEvent) => {
    const actionButton = clickEvent.target && clickEvent.target.closest ? clickEvent.target.closest('button') : null;
    if (!actionButton) return;
    if (actionButton.hasAttribute('data-db-source-add')) {
      addDataSourceEntry(formElement, editorState);
      return;
    }
    if (actionButton.hasAttribute('data-db-source-save')) {
      saveDataSourcesFromModal(editor, formElement, editorState);
      return;
    }
    if (actionButton.hasAttribute('data-db-source-cancel')) {
      editor.Modal.close();
      return;
    }
    const { entryElement, sourceEntry } = resolveEntry(actionButton);
    if (sourceEntry)
      handleDataSourceEntryClick(editor, formElement, editorState, sourceEntry, entryElement, actionButton);
  });
};

export default attachDataSourcesModalHandlers;
