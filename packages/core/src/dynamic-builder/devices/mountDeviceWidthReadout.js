import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import describeDeviceWidth from './describeDeviceWidth.js';
import openCustomDeviceWidthModal from './openCustomDeviceWidthModal.js';

const mountDeviceWidthReadout = (editor) => {
  const mountNow = () => {
    const canvasElement = editor.Canvas && editor.Canvas.getElement && editor.Canvas.getElement();
    if (!canvasElement || !canvasElement.ownerDocument || canvasElement.querySelector('[data-db-device-readout]'))
      return;
    const readoutElement = buildElementFromMarkup(
      canvasElement.ownerDocument,
      [
        '<div class="gjs-db-device-readout" data-db-device-readout role="status" aria-live="polite">',
        '<span data-db-device-readout-text></span>',
        '<button type="button" data-db-device-custom title="Preview at a width of your choice">Other width</button>',
        '</div>',
      ].join(''),
    );
    if (!readoutElement) return;
    canvasElement.appendChild(readoutElement);
    const textElement = readoutElement.querySelector('[data-db-device-readout-text]');
    const refreshReadout = () => {
      if (textElement) textElement.textContent = describeDeviceWidth(editor);
    };
    readoutElement
      .querySelector('[data-db-device-custom]')
      .addEventListener('click', () => openCustomDeviceWidthModal(editor));
    editor.on('device:select canvas:frame:load', () => setTimeout(refreshReadout, 60));
    const canvasWindow = canvasElement.ownerDocument.defaultView;
    if (canvasWindow) canvasWindow.addEventListener('resize', refreshReadout);
    editor.on('destroy', () => readoutElement.remove());
    refreshReadout();
    setTimeout(refreshReadout, 400);
  };
  if (editor.onReady) editor.onReady(mountNow);
  else mountNow();
};

export default mountDeviceWidthReadout;
