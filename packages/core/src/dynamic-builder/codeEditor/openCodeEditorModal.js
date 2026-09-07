import buildCodeFieldMarkup from './buildCodeFieldMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import guardModalDismiss from './guardModalDismiss.js';
import mountCodeField from './mountCodeField.js';
import openThemedModal from '../support/openThemedModal.js';
import showToastNotice from '../support/showToastNotice.js';

const openCodeEditorModal = (editor, modalOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const modalTitle = modalOptions.title || 'Edit code';
  const fieldLabel = modalOptions.label === modalTitle ? '' : modalOptions.label || '';
  const formMarkup = [
    '<form class="gjs-db-form gjs-db-code-editor-form">',
    buildCodeFieldMarkup({ name: 'code', label: fieldLabel, language: modalOptions.language, helpText: modalOptions.helpText || '' }),
    '<div class="gjs-db-button-row">',
    '<span class="gjs-db-muted gjs-db-code-shortcut-hint">Ctrl or Cmd + Enter saves</span>',
    '<button type="button" class="gjs-db-button" data-db-code-cancel>Cancel</button>',
    '<button type="submit" class="gjs-db-button gjs-db-button-primary" data-db-code-save>',
    escapeHtmlText(modalOptions.submitText || 'Save code'),
    '</button>',
    '</div>',
    '</form>',
  ].join('');
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, formMarkup);
  if (!formElement) return;
  const initialValue = String(modalOptions.value || '');
  let discardArmed = false;
  const cancelButton = formElement.querySelector('[data-db-code-cancel]');
  const codeSurface = mountCodeField(editor, formElement.querySelector('[data-db-code-field]'), {
    language: modalOptions.language,
    label: modalOptions.label,
    value: initialValue,
    onSubmitRequest: () => formElement.requestSubmit && formElement.requestSubmit(),
  });
  const isDirty = () => !!codeSurface && codeSurface.getValue() !== initialValue;
  const armDiscard = () => {
    discardArmed = true;
    cancelButton.textContent = 'Discard changes';
    showToastNotice(editor, 'You have unsaved code. Save it, or press Discard changes.', { kind: 'warning' });
  };
  const releaseGuard = guardModalDismiss(editor, isDirty, armDiscard);
  formElement.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    releaseGuard();
    editor.Modal.close();
    modalOptions.onSubmit(codeSurface ? codeSurface.getValue() : '');
  });
  cancelButton.addEventListener('click', () => {
    if (isDirty() && !discardArmed) return armDiscard();
    releaseGuard();
    return editor.Modal.close();
  });
  openThemedModal(editor, modalTitle, formElement, { className: 'gjs-db-code-modal' });
  codeSurface && codeSurface.focus();
};

export default openCodeEditorModal;
