import buildCustomCodeModalMarkup from './buildCustomCodeModalMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import collectCustomCodeFormValues from './collectCustomCodeFormValues.js';
import openThemedModal from '../support/openThemedModal.js';
import resolveCustomCodeSettings from './resolveCustomCodeSettings.js';
import saveCustomCodeSettings from './saveCustomCodeSettings.js';

const openCustomCodeModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const customCodeSettings = resolveCustomCodeSettings(editor, moduleOptions);
  const formMarkup = buildCustomCodeModalMarkup(customCodeSettings);
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, formMarkup);
  if (!formElement) return;
  formElement.addEventListener('submit', (submitEvent) => submitEvent.preventDefault());
  const saveButtonElement = formElement.querySelector('[data-db-custom-code-save]');
  if (saveButtonElement) {
    saveButtonElement.addEventListener('click', () => {
      saveCustomCodeSettings(editor, collectCustomCodeFormValues(formElement));
      editor.Modal.close();
    });
  }
  openThemedModal(editor, 'Custom code', formElement, { className: 'gjs-db-custom-code-modal' });
};

export default openCustomCodeModal;
