import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import openThemedModal from '../support/openThemedModal.js';

const openPageNameModal = (editor, modalTitle, initialValue, submitLabel, onSubmitName) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const formMarkup = [
    '<div class="gjs-db-form">',
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="db-page-name-input">Page name</label>',
    `<input id="db-page-name-input" class="gjs-db-field-input" type="text" value="${escapeHtmlText(initialValue)}" />`,
    '</div>',
    '<div class="gjs-db-button-row">',
    `<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-page-modal-submit>${escapeHtmlText(submitLabel)}</button>`,
    '<button type="button" class="gjs-db-button" data-db-page-modal-cancel>Cancel</button>',
    '</div>',
    '</div>',
  ].join('');
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, formMarkup);
  if (!formElement) return;
  const inputElement = formElement.querySelector('#db-page-name-input');
  const submitPageName = () => {
    const nameValue = String(inputElement.value || '').trim();
    if (!nameValue) {
      inputElement.classList.add('gjs-db-field-invalid');
      inputElement.focus();
      return;
    }
    editor.Modal.close();
    onSubmitName(nameValue);
  };
  formElement.querySelector('[data-db-page-modal-submit]').addEventListener('click', submitPageName);
  formElement.querySelector('[data-db-page-modal-cancel]').addEventListener('click', () => editor.Modal.close());
  inputElement.addEventListener('keydown', (keyEvent) => {
    if (keyEvent.key === 'Enter') submitPageName();
  });
  openThemedModal(editor, modalTitle, formElement, { className: 'gjs-db-page-modal' });
  setTimeout(() => inputElement.focus(), 50);
};

export default openPageNameModal;
