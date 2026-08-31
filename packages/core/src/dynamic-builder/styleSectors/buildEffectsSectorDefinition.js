import buildChoicePropertyRecord from './buildChoicePropertyRecord.js';
import buildTextPropertyRecord from './buildTextPropertyRecord.js';

const buildEffectsSectorDefinition = () => ({
  id: 'effects',
  name: 'Effects',
  open: false,
  properties: [
    'opacity',
    'box-shadow',
    buildTextPropertyRecord('filter', 'Filter', 'none'),
    buildTextPropertyRecord('backdrop-filter', 'Backdrop filter', 'none'),
    'transform',
    'transition',
    buildChoicePropertyRecord('select', 'pointer-events', 'Pointer events', 'auto', ['auto', 'none']),
  ],
});

export default buildEffectsSectorDefinition;
