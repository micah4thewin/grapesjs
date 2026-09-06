import buildCustomCodeModalMarkup from './buildCustomCodeModalMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import collectCustomCodeFormValues from './collectCustomCodeFormValues.js';
import getCustomCodeSlotRecords from './getCustomCodeSlotRecords.js';
import mountCodeField from '../codeEditor/mountCodeField.js';
import openThemedModal from '../support/openThemedModal.js';
import resolveCustomCodeSettings from './resolveCustomCodeSettings.js';
import saveCustomCodeSettings from './saveCustomCodeSettings.js';
import wireCustomCodeTabs from './wireCustomCodeTabs.js';

const openCustomCodeModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const customCodeSettings = resolveCustomCodeSettings(editor, moduleOptions);
  const formMarkup = buildCustomCodeModalMarkup(customCodeSettings);
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, formMarkup);
  if (!formElement) return;
  formElement.addEventListener('submit', (submitEvent) => submitEvent.preventDefault());
  const codeSurfaces = {};
  getCustomCodeSlotRecords().forEach((slotRecord) => {
    const fieldElement = formElement.querySelector('[data-db-code-field="' + slotRecord.name + '"]');
    if (!fieldElement) return;
    codeSurfaces[slotRecord.name] = mountCodeField(editor, fieldElement, {
      language: slotRecord.language,
      label: slotRecord.label,
      value: customCodeSettings[slotRecord.name],
    });
  });
  wireCustomCodeTabs(formElement, (slotName) => {
    const shownSurface = codeSurfaces[slotName];
    shownSurface && shownSurface.refresh();
  });
  const saveButtonElement = formElement.querySelector('[data-db-custom-code-save]');
  if (saveButtonElement) {
    saveButtonElement.addEventListener('click', () => {
      saveCustomCodeSettings(editor, collectCustomCodeFormValues(formElement, codeSurfaces));
      editor.Modal.close();
    });
  }
  openThemedModal(editor, 'Custom code', formElement, { className: 'gjs-db-custom-code-modal' });
};

export default openCustomCodeModal;
