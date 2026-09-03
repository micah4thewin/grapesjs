import buildCodeFieldMarkup from './buildCodeFieldMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import mountCodeField from './mountCodeField.js';
import openThemedModal from '../support/openThemedModal.js';

const openCodeEditorModal = (editor, modalOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const formMarkup = [
    '<form class="gjs-db-form gjs-db-code-editor-form">',
    buildCodeFieldMarkup({
      name: 'code',
      label: modalOptions.label || '',
      language: modalOptions.language,
      helpText: modalOptions.helpText || '',
    }),
    '<div class="gjs-db-button-row">',
    '<button type="submit" class="gjs-db-button gjs-db-button-primary" data-db-code-save>',
    escapeHtmlText(modalOptions.submitText || 'Save code'),
    '</button>',
    '</div>',
    '</form>',
  ].join('');
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, formMarkup);
  if (!formElement) return;
  const fieldElement = formElement.querySelector('[data-db-code-field]');
  const codeSurface = mountCodeField(editor, fieldElement, {
    language: modalOptions.language,
    label: modalOptions.label,
    value: modalOptions.value,
  });
  formElement.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    editor.Modal.close();
    modalOptions.onSubmit(codeSurface ? codeSurface.getValue() : '');
  });
  openThemedModal(editor, modalOptions.title || 'Edit code', formElement, { className: 'gjs-db-code-modal' });
  codeSurface && codeSurface.focus();
};

export default openCodeEditorModal;
