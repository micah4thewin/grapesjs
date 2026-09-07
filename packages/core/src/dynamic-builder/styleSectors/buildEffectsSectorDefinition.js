import buildChoicePropertyRecord from './buildChoicePropertyRecord.js';
import getEffectPresetRecords from './getEffectPresetRecords.js';

const buildEffectsSectorDefinition = () => {
  const presetRecords = getEffectPresetRecords();
  return {
    id: 'effects',
    name: 'Effects',
    open: false,
    properties: [
      'opacity',
      'box-shadow',
      buildChoicePropertyRecord('db-preset', 'filter', 'Filter', 'none', presetRecords.filter),
      buildChoicePropertyRecord('db-preset', 'backdrop-filter', 'Backdrop filter', 'none', presetRecords.backdropFilter),
      'transform',
      'transition',
      buildChoicePropertyRecord('select', 'pointer-events', 'Pointer events', 'auto', ['auto', 'none']),
    ],
  };
};

export default buildEffectsSectorDefinition;
