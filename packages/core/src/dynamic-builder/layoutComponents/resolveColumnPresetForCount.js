import getColumnPresetRecord from './getColumnPresetRecord.js';

const resolveColumnPresetForCount = (columnCount) => {
  const presetRecord = getColumnPresetRecord();
  return Object.keys(presetRecord).find((presetKey) => presetRecord[presetKey].columnCount === columnCount) || '';
};

export default resolveColumnPresetForCount;
