import getDeviceIconName from './getDeviceIconName.js';

const collectPaletteDeviceActions = (editor) => {
  const selectedDevice = editor.Devices.getSelected ? editor.Devices.getSelected() : null;
  return editor.Devices.getDevices().map((deviceModel) => {
    const deviceId = String(deviceModel.get('id'));
    return {
      actionId: `device:${deviceId}`,
      groupTitle: 'Devices',
      label: `Switch device: ${deviceModel.getName() || deviceId}`,
      iconName: getDeviceIconName(deviceId),
      keywords: `device viewport responsive ${deviceId}`,
      keysText: '',
      hintText: selectedDevice === deviceModel ? 'Current' : '',
      runAction: () => editor.Devices.select(deviceId),
    };
  });
};

export default collectPaletteDeviceActions;
