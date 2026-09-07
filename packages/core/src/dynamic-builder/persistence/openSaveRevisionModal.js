import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildSaveRevisionFormMarkup from './buildSaveRevisionFormMarkup.js';
import openThemedModal from '../support/openThemedModal.js';
import saveRevisionRecord from './saveRevisionRecord.js';

const openSaveRevisionModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) {
    saveRevisionRecord(editor, moduleOptions, '');
    return;
  }
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, buildSaveRevisionFormMarkup());
  if (!formElement) return;
  const labelInputElement = formElement.querySelector('[data-db-revision-label-input]');
  const errorElement = formElement.querySelector('[data-db-revision-error]');
  formElement.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    const savedRecord = saveRevisionRecord(editor, moduleOptions, labelInputElement ? labelInputElement.value : '');
    if (savedRecord) {
      editor.Modal.close();
      return;
    }
    const errorMessage = String(editor.getModel().get('dbLastRevisionErrorMessage') || 'The revision was not saved.');
    if (errorElement) errorElement.textContent = errorMessage;
    if (labelInputElement) {
      labelInputElement.setAttribute('aria-invalid', 'true');
      labelInputElement.focus();
    }
  });
  const cancelButtonElement = formElement.querySelector('[data-db-revision-cancel]');
  if (cancelButtonElement) cancelButtonElement.addEventListener('click', () => editor.Modal.close());
  openThemedModal(editor, 'Save revision', formElement, { className: 'gjs-db-save-revision-modal' });
  if (labelInputElement) labelInputElement.focus();
};

export default openSaveRevisionModal;
