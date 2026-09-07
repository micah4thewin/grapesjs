import buildDeviceIconMarkup from './buildDeviceIconMarkup.js';
import describeDeviceLabelText from './describeDeviceLabelText.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import formatDeviceWidthText from './formatDeviceWidthText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildDeviceMenuMarkup = (editor) => {
  const selectedDevice = editor.Devices.getSelected() || editor.Devices.getDevices()[0];
  const selectedDeviceId = selectedDevice ? String(selectedDevice.get('id')) : '';
  const menuItemsMarkup = editor.Devices.getDevices()
    .map((deviceModel) => {
      const deviceId = String(deviceModel.get('id'));
      const isSelected = deviceId === selectedDeviceId;
      return [
        `<button type="button" class="gjs-db-menu-item" role="menuitem" data-db-device="${escapeHtmlText(deviceId)}"`,
        ` aria-current="${isSelected ? 'true' : 'false'}">`,
        buildDeviceIconMarkup(deviceId, 15),
        `<span class="gjs-db-menu-item-label">${escapeHtmlText(describeDeviceLabelText(deviceModel))}</span>`,
        '</button>',
      ].join('');
    })
    .join('');
  const triggerLabel = selectedDevice ? describeDeviceLabelText(selectedDevice) : 'Device';
  return [
    '<div class="gjs-db-panel-group gjs-db-menu-host gjs-db-device-menu-host" role="group" aria-label="Device">',
    '<button type="button" class="gjs-db-panel-button gjs-db-menu-trigger" data-db-menu-trigger="devices"',
    ` aria-haspopup="true" aria-expanded="false" aria-label="Device: ${escapeHtmlText(triggerLabel)}" title="Preview width">`,
    `<span data-db-device-menu-icon>${selectedDevice ? buildDeviceIconMarkup(selectedDeviceId, 15) : ''}</span>`,
    `<span class="gjs-db-menu-trigger-label" data-db-device-menu-label>${escapeHtmlText(formatDeviceWidthText(selectedDevice))}</span>`,
    getIconMarkup('chevronDown', { size: 12 }),
    '</button>',
    `<div class="gjs-db-menu" data-db-menu="devices" role="menu" aria-label="Preview width" hidden>${menuItemsMarkup}</div>`,
    '</div>',
  ].join('');
};

export default buildDeviceMenuMarkup;
