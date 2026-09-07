import applyBrandPaletteToForm from './applyBrandPaletteToForm.js';
import fillTokenFormValues from './fillTokenFormValues.js';
import refreshTokenFormStates from './refreshTokenFormStates.js';
import resetDesignTokens from './resetDesignTokens.js';
import showToastNotice from '../support/showToastNotice.js';

const wireTokenFormActions = (editor, moduleOptions, formElement, actionContext) => {
  const confirmElement = formElement.querySelector('[data-db-token-reset-confirm]');
  const clearAllErrors = () =>
    formElement.querySelectorAll('.gjs-db-field-invalid').forEach((inputElement) => {
      inputElement.classList.remove('gjs-db-field-invalid');
      inputElement.removeAttribute('aria-invalid');
    });
  formElement.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target && clickEvent.target.closest ? clickEvent.target : null;
    if (!targetElement) return;
    if (targetElement.closest('[data-db-token-reset]') && confirmElement) {
      confirmElement.hidden = false;
      const acceptButton = confirmElement.querySelector('[data-db-token-reset-accept]');
      if (acceptButton) acceptButton.focus();
      return;
    }
    if (targetElement.closest('[data-db-token-reset-cancel]') && confirmElement) {
      confirmElement.hidden = true;
      return;
    }
    if (targetElement.closest('[data-db-token-reset-accept]')) {
      actionContext.modalState.applied = true;
      resetDesignTokens(editor, moduleOptions);
      editor.Modal.close();
      showToastNotice(editor, 'Design tokens reset to defaults. Press Ctrl+Z to undo.', { kind: 'success' });
      return;
    }
    if (targetElement.closest('[data-db-token-revert]')) {
      fillTokenFormValues(formElement, actionContext.openedRecord);
      clearAllErrors();
      formElement.querySelectorAll('[data-db-token-error]').forEach((errorElement) => {
        errorElement.hidden = true;
      });
      refreshTokenFormStates(formElement);
      actionContext.previewNow();
      showToastNotice(editor, 'Your edits were put back', { kind: 'info' });
      return;
    }
    if (!targetElement.closest('[data-db-token-brand-start]')) return;
    applyBrandPaletteToForm(editor, formElement);
    refreshTokenFormStates(formElement);
    actionContext.previewNow();
    showToastNotice(editor, 'Palette built from your brand colour. Press Done to keep it.', { kind: 'info' });
  });
};

export default wireTokenFormActions;
