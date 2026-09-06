import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import openThemedModal from '../support/openThemedModal.js';

const openSymbolNameModal = (editor, options) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const formMarkup = [
    '<form class="gjs-db-form gjs-db-symbol-name-form">',
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="gjs-db-symbol-name">Name</label>',
    '<input type="text" class="gjs-db-field-input" id="gjs-db-symbol-name" data-db-symbol-name ',
    'value="' + escapeHtmlText(options.initialName || '') + '" placeholder="Main navigation">',
    '<span class="gjs-db-field-help">' + escapeHtmlText(options.helpText || '') + '</span>',
    '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="submit" class="gjs-db-button gjs-db-button-primary" data-db-symbol-submit>',
    escapeHtmlText(options.submitText || 'Save'),
    '</button>',
    '</div>',
    '</form>',
  ].join('');
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, formMarkup);
  if (!formElement) return;
  const nameInput = formElement.querySelector('[data-db-symbol-name]');
  formElement.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    const enteredName = nameInput ? String(nameInput.value || '').trim() : '';
    if (!enteredName) {
      nameInput && nameInput.focus();
      return;
    }
    editor.Modal.close();
    options.onSubmit(enteredName);
  });
  openThemedModal(editor, options.titleText || 'Reusable component', formElement, {
    className: 'gjs-db-symbol-name-modal',
  });
  nameInput && nameInput.focus();
};

export default openSymbolNameModal;
