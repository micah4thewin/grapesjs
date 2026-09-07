import buildStatRecord from './buildStatRecord.js';
import getStatPresetRecords from './getStatPresetRecords.js';

const appendStatTile = (editor, statsComponent) => {
  if (!statsComponent || !statsComponent.append) return;
  const presetRecords = getStatPresetRecords();
  const presetRecord = presetRecords[statsComponent.components().length % presetRecords.length];
  const addedStat = statsComponent.append(buildStatRecord(presetRecord))[0];
  if (addedStat && editor && editor.select) editor.select(addedStat);
};

export default appendStatTile;
