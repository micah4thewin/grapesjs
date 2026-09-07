import describeDeviceWidth from '../devices/describeDeviceWidth.js';
import isEditorLive from '../support/isEditorLive.js';
import openCustomDeviceWidthModal from '../devices/openCustomDeviceWidthModal.js';

const wireDeviceSegment = (editor, workspaceElement) => {
  const readoutElement = workspaceElement.querySelector('[data-db-stage-width]');
  const refreshDeviceState = () => {
    if (!isEditorLive(editor) || !workspaceElement.isConnected) return;
    const selectedDevice = editor.Devices.getSelected();
    const selectedDeviceId = selectedDevice ? String(selectedDevice.get('id')) : '';
    workspaceElement.querySelectorAll('[data-db-stage-device]').forEach((deviceButton) => {
      const isSelected = deviceButton.getAttribute('data-db-stage-device') === selectedDeviceId;
      deviceButton.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    });
    if (readoutElement) readoutElement.textContent = describeDeviceWidth(editor);
  };
  workspaceElement.addEventListener('click', (clickEvent) => {
    const closest = clickEvent.target.closest && clickEvent.target.closest.bind(clickEvent.target);
    if (!closest) return;
    const deviceButton = closest('[data-db-stage-device]');
    if (deviceButton && workspaceElement.contains(deviceButton)) {
      editor.Devices.select(deviceButton.getAttribute('data-db-stage-device'));
      return;
    }
    const widthButton = closest('[data-db-stage-width]');
    if (widthButton && workspaceElement.contains(widthButton)) openCustomDeviceWidthModal(editor);
  });
  editor.on('device:select canvas:frame:load', () => setTimeout(refreshDeviceState, 60));
  refreshDeviceState();
  setTimeout(refreshDeviceState, 400);
};

export default wireDeviceSegment;
