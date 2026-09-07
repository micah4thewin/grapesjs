import activateTokenGroupTab from './activateTokenGroupTab.js';
import applyTokenRecordUpdate from './applyTokenRecordUpdate.js';
import buildBaselineTokenRecord from './buildBaselineTokenRecord.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildTokenManagerFormMarkup from './buildTokenManagerFormMarkup.js';
import clearTokenUsageHighlight from './clearTokenUsageHighlight.js';
import collectTokenValuesFromForm from './collectTokenValuesFromForm.js';
import getTokenManagerEditorCss from './getTokenManagerEditorCss.js';
import injectDesignTokenStyles from './injectDesignTokenStyles.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openThemedModal from '../support/openThemedModal.js';
import previewTokenRecord from './previewTokenRecord.js';
import refreshTokenFormStates from './refreshTokenFormStates.js';
import resolveActiveDesignTokens from './resolveActiveDesignTokens.js';
import showToastNotice from '../support/showToastNotice.js';
import validateTokenForm from './validateTokenForm.js';
import wireTokenFormActions from './wireTokenFormActions.js';
import wireTokenFormInputs from './wireTokenFormInputs.js';
import wireTokenGroupTabs from './wireTokenGroupTabs.js';
import wireTokenUsageHighlight from './wireTokenUsageHighlight.js';

const openTokenManagerModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  injectEditorStylesOnce(editor, 'db-css-token-manager', getTokenManagerEditorCss());
  const openedRecord = resolveActiveDesignTokens(editor, moduleOptions);
  const formElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    buildTokenManagerFormMarkup(openedRecord, buildBaselineTokenRecord(moduleOptions)),
  );
  if (!formElement) return;
  const modalState = { applied: false };
  const previewNow = () =>
    previewTokenRecord(editor, moduleOptions, collectTokenValuesFromForm(formElement, { skipInvalid: true }));
  wireTokenGroupTabs(formElement);
  wireTokenFormInputs(formElement, previewNow);
  wireTokenUsageHighlight(editor, formElement);
  wireTokenFormActions(editor, moduleOptions, formElement, { openedRecord, modalState, previewNow });
  formElement.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    const invalidFields = validateTokenForm(formElement);
    if (invalidFields.length) {
      const invalidInput = invalidFields[0].querySelector('[data-db-token-group]');
      activateTokenGroupTab(formElement, invalidInput.getAttribute('data-db-token-group'));
      invalidInput.focus();
      showToastNotice(editor, 'Fix the highlighted values first', { kind: 'warning' });
      return;
    }
    modalState.applied = true;
    applyTokenRecordUpdate(editor, moduleOptions, collectTokenValuesFromForm(formElement), {
      stepLabel: 'Design tokens',
    });
    editor.Modal.close();
    showToastNotice(editor, 'Design tokens saved. Press Ctrl+Z to undo.', { kind: 'success' });
  });
  if (editor.Modal.onceClose) {
    editor.Modal.onceClose(() => {
      clearTokenUsageHighlight(editor);
      if (!modalState.applied) injectDesignTokenStyles(editor, openedRecord);
    });
  }
  openThemedModal(editor, 'Design tokens', formElement, { className: 'gjs-db-token-manager' });
  refreshTokenFormStates(formElement);
  const firstInput = formElement.querySelector('input[data-db-token-group]');
  if (firstInput && firstInput.focus) firstInput.focus();
};

export default openTokenManagerModal;
