import buildChoicePropertyRecord from './buildChoicePropertyRecord.js';
import buildTextPropertyRecord from './buildTextPropertyRecord.js';

const buildSizingSectorDefinition = () => ({
  id: 'sizing',
  name: 'Sizing',
  open: false,
  properties: [
    'width',
    'height',
    'min-width',
    'max-width',
    'min-height',
    'max-height',
    buildTextPropertyRecord('aspect-ratio', 'Aspect ratio', 'auto'),
    buildChoicePropertyRecord('select', 'object-fit', 'Object fit', 'fill', [
      'fill',
      'contain',
      'cover',
      'none',
      'scale-down',
    ]),
    buildChoicePropertyRecord('select', 'object-position', 'Object position', 'center center', [
      'left top',
      'left center',
      'left bottom',
      'center top',
      'center center',
      'center bottom',
      'right top',
      'right center',
      'right bottom',
    ]),
  ],
});

export default buildSizingSectorDefinition;
