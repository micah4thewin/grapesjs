import getFieldPresetRecords from './getFieldPresetRecords.js';

const getFieldKindOptions = () =>
  getFieldPresetRecords()
    .filter((presetRecord) => presetRecord.controlDefinition)
    .map((presetRecord) => ({ id: presetRecord.id, label: presetRecord.label }));

export default getFieldKindOptions;
