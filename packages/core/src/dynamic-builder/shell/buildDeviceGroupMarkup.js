import buildDeviceIconMarkup from './buildDeviceIconMarkup.js';
import describeDeviceLabelText from './describeDeviceLabelText.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildDeviceGroupMarkup = (editor) => {
  const selectedDevice = editor.Devices.getSelected();
  const selectedDeviceId = selectedDevice ? String(selectedDevice.get('id')) : '';
  const deviceButtonsMarkup = editor.Devices.getDevices()
    .map((deviceModel) => {
      const deviceId = String(deviceModel.get('id'));
      const pressedText = deviceId === selectedDeviceId ? 'true' : 'false';
      const labelText = escapeHtmlText(describeDeviceLabelText(deviceModel));
      return [
        `<button type="button" class="gjs-db-panel-button" data-db-device="${escapeHtmlText(deviceId)}"`,
        ` aria-pressed="${pressedText}" aria-label="${labelText}" title="${labelText}">`,
        buildDeviceIconMarkup(deviceId, 16),
        '</button>',
      ].join('');
    })
    .join('');
  return [
    '<div class="gjs-db-panel-group gjs-db-device-group" role="group" aria-label="Devices">',
    deviceButtonsMarkup,
    '</div>',
  ].join('');
};

export default buildDeviceGroupMarkup;
