import buildDeviceIconMarkup from './buildDeviceIconMarkup.js';
import describeDeviceLabelText from './describeDeviceLabelText.js';
import formatDeviceWidthText from './formatDeviceWidthText.js';

const wireDeviceButtons = (editor, stripElement) => {
  const refreshPressedStates = () => {
    const selectedDevice = editor.Devices.getSelected();
    const selectedDeviceId = selectedDevice ? String(selectedDevice.get('id')) : '';
    stripElement.querySelectorAll('[data-db-device]').forEach((deviceButton) => {
      const isSelected = deviceButton.getAttribute('data-db-device') === selectedDeviceId;
      const stateAttribute = deviceButton.getAttribute('role') === 'menuitem' ? 'aria-current' : 'aria-pressed';
      deviceButton.setAttribute(stateAttribute, isSelected ? 'true' : 'false');
    });
    const menuTrigger = stripElement.querySelector('[data-db-menu-trigger="devices"]');
    if (!menuTrigger || !selectedDevice) return;
    const iconSlot = menuTrigger.querySelector('[data-db-device-menu-icon]');
    const labelSlot = menuTrigger.querySelector('[data-db-device-menu-label]');
    if (iconSlot) iconSlot.innerHTML = buildDeviceIconMarkup(selectedDeviceId, 15);
    if (labelSlot) labelSlot.textContent = formatDeviceWidthText(selectedDevice);
    menuTrigger.setAttribute('aria-label', `Device: ${describeDeviceLabelText(selectedDevice)}`);
  };
  editor.on('device:select', refreshPressedStates);
  refreshPressedStates();
};

export default wireDeviceButtons;
