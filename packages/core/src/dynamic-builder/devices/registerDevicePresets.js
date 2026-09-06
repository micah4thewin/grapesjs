import collectExtraDevicePresets from './collectExtraDevicePresets.js';
import getDefaultDevicePresets from './getDefaultDevicePresets.js';

const registerDevicePresets = (editor, moduleOptions) => {
  const deviceManager = editor.Devices;
  const devicePresets = [...getDefaultDevicePresets(), ...collectExtraDevicePresets(moduleOptions)];
  const staleDeviceIds = ['tablet'].concat(devicePresets.map((devicePreset) => devicePreset.id));
  staleDeviceIds.forEach((staleDeviceId) => {
    if (deviceManager.get(staleDeviceId)) deviceManager.remove(staleDeviceId, { silent: true });
  });
  devicePresets.forEach((devicePreset) => deviceManager.add(devicePreset, { silent: true }));
  deviceManager.select('desktop');
};

export default registerDevicePresets;
