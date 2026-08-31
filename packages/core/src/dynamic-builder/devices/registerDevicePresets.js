import collectExtraDevicePresets from './collectExtraDevicePresets.js';
import getDefaultDevicePresets from './getDefaultDevicePresets.js';

const registerDevicePresets = (editor, moduleOptions) => {
  const deviceManager = editor.Devices;
  const stockDeviceIds = ['desktop', 'tablet', 'mobileLandscape', 'mobilePortrait'];
  stockDeviceIds.forEach((stockDeviceId) => {
    if (deviceManager.get(stockDeviceId)) deviceManager.remove(stockDeviceId, { silent: true });
  });
  const devicePresets = [...getDefaultDevicePresets(), ...collectExtraDevicePresets(moduleOptions)];
  devicePresets.forEach((devicePreset) => {
    if (deviceManager.get(devicePreset.id)) deviceManager.remove(devicePreset.id, { silent: true });
    deviceManager.add(devicePreset, { silent: true });
  });
  deviceManager.select('desktop');
};

export default registerDevicePresets;
