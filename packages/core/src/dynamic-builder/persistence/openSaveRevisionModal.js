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
  formElement.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    saveRevisionRecord(editor, moduleOptions, labelInputElement ? labelInputElement.value : '');
    editor.Modal.close();
  });
  const cancelButtonElement = formElement.querySelector('[data-db-revision-cancel]');
  if (cancelButtonElement) cancelButtonElement.addEventListener('click', () => editor.Modal.close());
  openThemedModal(editor, 'Save revision', formElement, { className: 'gjs-db-save-revision-modal' });
  if (labelInputElement) labelInputElement.focus();
};

export default openSaveRevisionModal;
