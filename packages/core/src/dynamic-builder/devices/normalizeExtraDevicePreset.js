import isPlainRecord from '../support/isPlainRecord.js';
import readDeviceSizeValue from './readDeviceSizeValue.js';

const normalizeExtraDevicePreset = (extraPreset) => {
  if (!isPlainRecord(extraPreset)) return null;
  const presetId = typeof extraPreset.id === 'string' ? extraPreset.id.trim() : '';
  if (!presetId) return null;
  const presetName =
    typeof extraPreset.name === 'string' && extraPreset.name.trim() ? extraPreset.name.trim() : presetId;
  const presetWidth = readDeviceSizeValue(extraPreset.width);
  const presetWidthMedia = readDeviceSizeValue(extraPreset.widthMedia);
  const devicePreset = { id: presetId, name: presetName, width: presetWidth };
  if (presetWidthMedia !== null) devicePreset.widthMedia = presetWidthMedia;
  return devicePreset;
};

export default normalizeExtraDevicePreset;
