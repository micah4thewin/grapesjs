import buildCustomCodeModalMarkup from './buildCustomCodeModalMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import collectCustomCodeFormValues from './collectCustomCodeFormValues.js';
import getCustomCodeSlotRecords from './getCustomCodeSlotRecords.js';
import guardModalDismiss from '../codeEditor/guardModalDismiss.js';
import mountCodeField from '../codeEditor/mountCodeField.js';
import openThemedModal from '../support/openThemedModal.js';
import resolveCustomCodeSettings from './resolveCustomCodeSettings.js';
import saveCustomCodeSettings from './saveCustomCodeSettings.js';
import showToastNotice from '../support/showToastNotice.js';
import wireCustomCodeScriptNotices from './wireCustomCodeScriptNotices.js';
import wireCustomCodeTabs from './wireCustomCodeTabs.js';

const openCustomCodeModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const customCodeSettings = resolveCustomCodeSettings(editor, moduleOptions);
  const idToken = 'gjs-db-custom-code-' + Date.now().toString(36);
  const formElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    buildCustomCodeModalMarkup(customCodeSettings, idToken),
  );
  if (!formElement) return;
  formElement.addEventListener('submit', (submitEvent) => submitEvent.preventDefault());
  const codeSurfaces = {};
  let isDirty = false;
  let discardArmed = false;
  let refreshNotices = () => undefined;
  const markDirty = () => {
    isDirty = true;
    refreshNotices();
  };
  const saveAndClose = () => {
    releaseGuard();
    saveCustomCodeSettings(editor, collectCustomCodeFormValues(formElement, codeSurfaces));
    editor.Modal.close();
  };
  getCustomCodeSlotRecords().forEach((slotRecord) => {
    const fieldElement = formElement.querySelector('[data-db-code-field="' + slotRecord.name + '"]');
    if (!fieldElement) return;
    codeSurfaces[slotRecord.name] = mountCodeField(editor, fieldElement, {
      language: slotRecord.language,
      label: slotRecord.label,
      value: customCodeSettings[slotRecord.name],
      onChange: markDirty,
      onSubmitRequest: saveAndClose,
    });
  });
  refreshNotices = wireCustomCodeScriptNotices(formElement, codeSurfaces);
  formElement.addEventListener('change', markDirty);
  wireCustomCodeTabs(formElement, (slotName) => codeSurfaces[slotName] && codeSurfaces[slotName].refresh());
  const cancelButton = formElement.querySelector('[data-db-custom-code-cancel]');
  const armDiscard = () => {
    discardArmed = true;
    cancelButton.textContent = 'Discard changes';
    showToastNotice(editor, 'You have unsaved custom code. Save it, or press Discard changes.', { kind: 'warning' });
  };
  const releaseGuard = guardModalDismiss(editor, () => isDirty, armDiscard);
  cancelButton.addEventListener('click', () => {
    if (isDirty && !discardArmed) return armDiscard();
    releaseGuard();
    return editor.Modal.close();
  });
  formElement.querySelector('[data-db-custom-code-save]').addEventListener('click', saveAndClose);
  openThemedModal(editor, 'Custom code', formElement, { className: 'gjs-db-custom-code-modal' });
};

export default openCustomCodeModal;
