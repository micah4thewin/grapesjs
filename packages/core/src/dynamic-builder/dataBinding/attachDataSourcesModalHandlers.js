import addDataSourceEntry from './addDataSourceEntry.js';
import collectDataSourcesFromForm from './collectDataSourcesFromForm.js';
import updateDataSourceRegistry from './updateDataSourceRegistry.js';
import validateJsonAreaElement from './validateJsonAreaElement.js';

const attachDataSourcesModalHandlers = (editor, formElement) => {
  const deletedSourceNames = new Set();
  const findActionElement = (eventTarget, actionSelector) =>
    eventTarget && eventTarget.closest ? eventTarget.closest(actionSelector) : null;
  formElement.addEventListener('submit', (submitEvent) => submitEvent.preventDefault());
  formElement.addEventListener('input', (inputEvent) => {
    const targetElement = inputEvent.target;
    if (targetElement && targetElement.hasAttribute && targetElement.hasAttribute('data-db-source-json')) {
      validateJsonAreaElement(targetElement);
    }
  });
  formElement.addEventListener('click', (clickEvent) => {
    const deleteButton = findActionElement(clickEvent.target, '[data-db-source-delete]');
    if (deleteButton) {
      const entryElement = deleteButton.closest('[data-db-source-entry]');
      if (entryElement) {
        deletedSourceNames.add(entryElement.getAttribute('data-db-source-entry'));
        entryElement.remove();
      }
      return;
    }
    if (findActionElement(clickEvent.target, '[data-db-source-add]')) {
      addDataSourceEntry(formElement, deletedSourceNames);
      return;
    }
    if (findActionElement(clickEvent.target, '[data-db-source-save]')) {
      const collectedRecord = collectDataSourcesFromForm(formElement);
      if (!collectedRecord) return;
      deletedSourceNames.forEach((deletedName) => {
        if (!(deletedName in collectedRecord)) collectedRecord[deletedName] = null;
      });
      updateDataSourceRegistry(editor, collectedRecord);
      editor.Modal.close();
    }
  });
};

export default attachDataSourcesModalHandlers;
