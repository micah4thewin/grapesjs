import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildPageNameFormMarkup from './buildPageNameFormMarkup.js';
import getEditorInstanceSuffix from './getEditorInstanceSuffix.js';
import openThemedModal from '../support/openThemedModal.js';
import toSlugText from '../support/toSlugText.js';

const openPageNameModal = (editor, modalOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const inputId = 'db-page-name-input' + getEditorInstanceSuffix(editor);
  const formMarkup = buildPageNameFormMarkup(inputId, modalOptions.initialValue || '', modalOptions.submitLabel);
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, formMarkup);
  if (!formElement) return;
  const inputElement = formElement.querySelector('.gjs-db-field-input');
  const errorElement = formElement.querySelector('.gjs-db-field-error-text');
  const addressElement = formElement.querySelector('[data-db-page-address]');
  const refreshAddressPreview = () => {
    if (!addressElement) return;
    const slugText = modalOptions.fixedAddress || `${toSlugText(inputElement.value) || 'page'}.html`;
    addressElement.textContent = `Address: ${slugText}`;
  };
  const submitPageName = () => {
    const nameValue = String(inputElement.value || '').trim();
    const validationResult = modalOptions.validateName
      ? modalOptions.validateName(nameValue)
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
    modalOptions.onSubmitName(nameValue);
  };
  formElement.querySelector('[data-db-page-modal-submit]').addEventListener('click', submitPageName);
  formElement.querySelector('[data-db-page-modal-cancel]').addEventListener('click', () => editor.Modal.close());
  inputElement.addEventListener('input', refreshAddressPreview);
  inputElement.addEventListener('keydown', (keyEvent) => {
    if (keyEvent.key === 'Enter') submitPageName();
    if (keyEvent.key === 'Escape') editor.Modal.close();
  });
  refreshAddressPreview();
  openThemedModal(editor, modalOptions.modalTitle, formElement, { className: 'gjs-db-page-modal' });
  setTimeout(() => {
    inputElement.focus();
    if (modalOptions.initialValue && inputElement.select) inputElement.select();
  }, 50);
};

export default openPageNameModal;
