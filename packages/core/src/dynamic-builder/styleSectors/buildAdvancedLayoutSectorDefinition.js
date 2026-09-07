import buildChoicePropertyRecord from './buildChoicePropertyRecord.js';

const buildAdvancedLayoutSectorDefinition = () => ({
  id: 'layout-advanced',
  name: 'Advanced layout',
  open: false,
  properties: [
    'overflow',
    'float',
    buildChoicePropertyRecord('select', 'visibility', 'Visibility', 'visible', ['visible', 'hidden', 'collapse']),
    'cursor',
  ],
});

export default buildAdvancedLayoutSectorDefinition;
