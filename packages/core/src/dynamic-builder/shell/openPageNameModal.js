import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getEditorInstanceSuffix from './getEditorInstanceSuffix.js';
import openThemedModal from '../support/openThemedModal.js';

const openPageNameModal = (editor, modalTitle, initialValue, submitLabel, onSubmitName, validateName) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const inputId = 'db-page-name-input' + getEditorInstanceSuffix(editor);
  const errorId = inputId + '-error';
  const formMarkup = [
    '<div class="gjs-db-form">',
    '<div class="gjs-db-field">',
    `<label class="gjs-db-field-label" for="${inputId}">Page name</label>`,
    `<input id="${inputId}" class="gjs-db-field-input" type="text" value="${escapeHtmlText(initialValue)}"`,
    ` aria-describedby="${errorId}" />`,
    `<div class="gjs-db-field-help gjs-db-field-error-text" id="${errorId}" role="alert"></div>`,
    '</div>',
    '<div class="gjs-db-button-row">',
    `<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-page-modal-submit>${escapeHtmlText(submitLabel)}</button>`,
    '<button type="button" class="gjs-db-button" data-db-page-modal-cancel>Cancel</button>',
    '</div>',
    '</div>',
  ].join('');
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, formMarkup);
  if (!formElement) return;
  const inputElement = formElement.querySelector('.gjs-db-field-input');
  const errorElement = formElement.querySelector('.gjs-db-field-error-text');
  const submitPageName = () => {
    const nameValue = String(inputElement.value || '').trim();
    const validationResult = validateName
      ? validateName(nameValue)
      : { isValid: !!nameValue, message: 'Enter a page name.' };
    if (!validationResult.isValid) {
      inputElement.classList.add('gjs-db-field-invalid');
      inputElement.setAttribute('aria-invalid', 'true');
      if (errorElement) errorElement.textContent = validationResult.message;
      inputElement.focus();
      return;
    }
    inputElement.classList.remove('gjs-db-field-invalid');
    inputElement.removeAttribute('aria-invalid');
    editor.Modal.close();
    onSubmitName(nameValue);
  };
  formElement.querySelector('[data-db-page-modal-submit]').addEventListener('click', submitPageName);
  formElement.querySelector('[data-db-page-modal-cancel]').addEventListener('click', () => editor.Modal.close());
  inputElement.addEventListener('keydown', (keyEvent) => {
    if (keyEvent.key === 'Enter') submitPageName();
    if (keyEvent.key === 'Escape') editor.Modal.close();
  });
  openThemedModal(editor, modalTitle, formElement, { className: 'gjs-db-page-modal' });
  setTimeout(() => {
    inputElement.focus();
    if (initialValue && inputElement.select) inputElement.select();
  }, 50);
};

export default openPageNameModal;
