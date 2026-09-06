import applyTokenRecordUpdate from './applyTokenRecordUpdate.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildTokenManagerFormMarkup from './buildTokenManagerFormMarkup.js';
import collectTokenValuesFromForm from './collectTokenValuesFromForm.js';
import openThemedModal from '../support/openThemedModal.js';
import resetDesignTokens from './resetDesignTokens.js';
import resolveActiveDesignTokens from './resolveActiveDesignTokens.js';
import showToastNotice from '../support/showToastNotice.js';

const openTokenManagerModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const activeRecord = resolveActiveDesignTokens(editor, moduleOptions);
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, buildTokenManagerFormMarkup(activeRecord));
  if (!formElement) return;
  const applyFormValues = () => {
    applyTokenRecordUpdate(editor, moduleOptions, collectTokenValuesFromForm(formElement));
    editor.Modal.close();
    showToastNotice(editor, 'Design tokens applied', { kind: 'success' });
  };
  formElement.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    applyFormValues();
  });
  const resetButton = formElement.querySelector('[data-db-token-reset]');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      resetDesignTokens(editor, moduleOptions);
      editor.Modal.close();
      showToastNotice(editor, 'Design tokens reset to defaults', { kind: 'success' });
    });
  }
  openThemedModal(editor, 'Design tokens', formElement, { className: 'gjs-db-token-manager' });
  const firstInput = formElement.querySelector('input');
  if (firstInput && firstInput.focus) firstInput.focus();
};

export default openTokenManagerModal;
