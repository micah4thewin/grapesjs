import buildDataSourceEntryMarkup from './buildDataSourceEntryMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';

const addDataSourceEntry = (formElement, deletedSourceNames) => {
  const listElement = formElement.querySelector('[data-db-source-list]');
  const nameInput = formElement.querySelector('[data-db-source-add-name]');
  if (!listElement || !nameInput) return;
  const cleanName = String(nameInput.value || '')
    .trim()
    .replace(/[^A-Za-z0-9_-]/g, '');
  const isDuplicate = Boolean(cleanName) && Boolean(listElement.querySelector(`[data-db-source-entry="${cleanName}"]`));
  if (!cleanName || isDuplicate) {
    nameInput.classList.add('gjs-db-trait-invalid');
    nameInput.setAttribute('title', 'Enter a unique source name using letters, numbers, dashes, underscores');
    return;
  }
  nameInput.classList.remove('gjs-db-trait-invalid');
  nameInput.removeAttribute('title');
  const entryElement = buildElementFromMarkup(formElement.ownerDocument, buildDataSourceEntryMarkup(cleanName, []));
  if (!entryElement) return;
  listElement.appendChild(entryElement);
  deletedSourceNames.delete(cleanName);
  nameInput.value = '';
};

export default addDataSourceEntry;
