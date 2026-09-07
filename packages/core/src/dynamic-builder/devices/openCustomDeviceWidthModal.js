import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import openThemedModal from '../support/openThemedModal.js';
import selectCustomDeviceWidth from './selectCustomDeviceWidth.js';
import showToastNotice from '../support/showToastNotice.js';

const openCustomDeviceWidthModal = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const existingDevice = editor.Devices && editor.Devices.get ? editor.Devices.get('custom') : null;
  const startWidth = existingDevice ? parseInt(existingDevice.get('width'), 10) || 1024 : 1024;
  const formElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    [
      '<form class="gjs-db-form gjs-db-device-width-form" data-db-device-width-form>',
      '<p class="gjs-db-muted">Preview the page at any width, for example 1024 for a small laptop or 1440 for a large monitor.</p>',
      '<label class="gjs-db-field">',
      '<span class="gjs-db-field-label">Width in pixels</span>',
      `<input class="gjs-db-field-input" type="number" min="320" max="3840" step="1" value="${startWidth}" name="width" required />`,
      '<span class="gjs-db-field-help">Style changes made at this width apply to screens up to that size.</span>',
      '</label>',
      '<div class="gjs-db-button-row">',
      '<button type="submit" class="gjs-db-button gjs-db-button-primary">Preview at this width</button>',
      '</div>',
      '</form>',
    ].join(''),
  );
  if (!formElement) return;
  formElement.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();
    const widthInput = formElement.querySelector('input[name="width"]');
    const chosenWidth = selectCustomDeviceWidth(editor, widthInput ? widthInput.value : 0);
    if (!chosenWidth) {
      showToastNotice(editor, 'Enter a width between 320 and 3840 pixels', { kind: 'warning' });
      return;
    }
    editor.Modal.close();
    showToastNotice(editor, `Previewing at ${chosenWidth} px`, { kind: 'success' });
  });
  openThemedModal(editor, 'Other width', formElement, { className: 'gjs-db-device-width-modal' });
  const widthInput = formElement.querySelector('input');
  if (widthInput && widthInput.focus) {
    widthInput.focus();
    widthInput.select();
  }
};

export default openCustomDeviceWidthModal;
