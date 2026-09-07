import findDataSourceEntry from './findDataSourceEntry.js';
import renderDataSourceEntry from './renderDataSourceEntry.js';
import toCamelCaseName from './toCamelCaseName.js';

const showNameError = (nameInput, errorElement, errorText) => {
  nameInput.classList.add('gjs-db-trait-invalid');
  nameInput.setAttribute('aria-invalid', 'true');
  if (errorElement) {
    errorElement.textContent = errorText;
    errorElement.hidden = false;
  }
  nameInput.focus();
};

const addDataSourceEntry = (formElement, editorState) => {
  const nameInput = formElement.querySelector('[data-db-source-add-name]');
  const errorElement = formElement.querySelector('[data-db-source-add-error]');
  if (!nameInput) return null;
  const cleanName = toCamelCaseName(nameInput.value);
  if (!cleanName) {
    showNameError(nameInput, errorElement, 'Enter a name for the new source, for example Partners.');
    return null;
  }
  if (findDataSourceEntry(editorState, cleanName)) {
    showNameError(nameInput, errorElement, `A source called ${cleanName} already exists. Pick another name.`);
    return null;
  }
  editorState.entries.push({
    name: cleanName,
    value: [],
    mode: 'table',
    jsonText: '',
    jsonError: '',
    pasteOpen: false,
  });
  editorState.deletedNames.delete(cleanName);
  nameInput.value = '';
  nameInput.classList.remove('gjs-db-trait-invalid');
  nameInput.removeAttribute('aria-invalid');
  if (errorElement) errorElement.hidden = true;
  const hintElement = formElement.querySelector('[data-db-source-add-hint]');
  if (hintElement) hintElement.textContent = `Added ${cleanName}. Add fields and items below.`;
  return renderDataSourceEntry(formElement, editorState, cleanName, '[data-db-field-add]');
};

export default addDataSourceEntry;
