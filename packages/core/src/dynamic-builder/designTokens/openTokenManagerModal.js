import applyTokenRecordUpdate from './applyTokenRecordUpdate.js';
import buildBaselineTokenRecord from './buildBaselineTokenRecord.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildTokenManagerFormMarkup from './buildTokenManagerFormMarkup.js';
import collectTokenValuesFromForm from './collectTokenValuesFromForm.js';
import openThemedModal from '../support/openThemedModal.js';
import resolveActiveDesignTokens from './resolveActiveDesignTokens.js';

const openTokenManagerModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const activeRecord = resolveActiveDesignTokens(editor, moduleOptions);
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, buildTokenManagerFormMarkup(activeRecord));
  if (!formElement) return;
  formElement.addEventListener('submit', (submitEvent) => submitEvent.preventDefault());
  const applyButton = formElement.querySelector('[data-db-token-apply]');
  const resetButton = formElement.querySelector('[data-db-token-reset]');
  if (applyButton) {
    applyButton.addEventListener('click', () => {
      applyTokenRecordUpdate(editor, moduleOptions, collectTokenValuesFromForm(formElement));
      editor.Modal.close();
    });
  }
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      applyTokenRecordUpdate(editor, moduleOptions, buildBaselineTokenRecord(moduleOptions));
      editor.Modal.close();
    });
  }
  openThemedModal(editor, 'Design tokens', formElement, { className: 'gjs-db-token-manager' });
};

export default openTokenManagerModal;
