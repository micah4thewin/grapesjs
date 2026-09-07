import normalizeExtraDevicePreset from './normalizeExtraDevicePreset.js';

const selectCustomDeviceWidth = (editor, requestedWidth) => {
  const deviceManager = editor.Devices;
  const widthValue = Math.max(320, Math.min(3840, Math.round(Number(requestedWidth) || 0)));
  if (!deviceManager || !widthValue) return 0;
  const customPreset = normalizeExtraDevicePreset({
    id: 'custom',
    name: `Custom ${widthValue} px`,
    width: widthValue,
    widthMedia: widthValue,
  });
  if (deviceManager.get('custom')) deviceManager.remove('custom', { silent: true });
  deviceManager.add(customPreset, { silent: true });
  deviceManager.select('custom');
  return widthValue;
};

export default selectCustomDeviceWidth;
