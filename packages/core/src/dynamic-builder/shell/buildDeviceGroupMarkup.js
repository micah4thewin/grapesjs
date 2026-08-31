import buildPanelIconButtonMarkup from './buildPanelIconButtonMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getDeviceIconName from './getDeviceIconName.js';

const buildDeviceGroupMarkup = (editor) => {
  const selectedDevice = editor.Devices.getSelected();
  const selectedDeviceId = selectedDevice ? String(selectedDevice.get('id')) : '';
  const deviceButtonsMarkup = editor.Devices.getDevices()
    .map((deviceModel) => {
      const deviceId = String(deviceModel.get('id'));
      const pressedText = deviceId === selectedDeviceId ? 'true' : 'false';
      const attributesText = `data-db-device="${escapeHtmlText(deviceId)}" aria-pressed="${pressedText}"`;
      return buildPanelIconButtonMarkup(deviceModel.getName() || deviceId, getDeviceIconName(deviceId), attributesText);
    })
    .join('');
  return `<div class="gjs-db-panel-group" role="group" aria-label="Devices">${deviceButtonsMarkup}</div>`;
};

export default buildDeviceGroupMarkup;
