import buildChoicePropertyRecord from './buildChoicePropertyRecord.js';
import buildNumberPropertyRecord from './buildNumberPropertyRecord.js';

const buildBordersSectorDefinition = () => ({
  id: 'borders',
  name: 'Borders',
  open: false,
  properties: [
    'border',
    'border-radius',
    {
      type: 'composite',
      property: 'outline',
      name: 'Outline',
      properties: [
        buildNumberPropertyRecord('outline-width', 'Width', '0', { units: ['px', 'em', 'rem'] }),
        buildChoicePropertyRecord('select', 'outline-style', 'Style', 'none', [
          'none',
          'solid',
          'dotted',
          'dashed',
          'double',
          'groove',
          'ridge',
          'inset',
          'outset',
        ]),
        { type: 'color', property: 'outline-color', name: 'Color', default: 'black', full: true },
      ],
    },
  ],
});

export default buildBordersSectorDefinition;
