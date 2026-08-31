import normalizeExtraDevicePreset from './normalizeExtraDevicePreset.js';

const collectExtraDevicePresets = (moduleOptions) => {
  const extraPresetList = Array.isArray(moduleOptions && moduleOptions.extra) ? moduleOptions.extra : [];
  return extraPresetList.map(normalizeExtraDevicePreset).filter((devicePreset) => devicePreset !== null);
};

export default collectExtraDevicePresets;
