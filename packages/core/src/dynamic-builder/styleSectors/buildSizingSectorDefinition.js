import buildChoicePropertyRecord from './buildChoicePropertyRecord.js';
import getAspectRatioPresetRecords from './getAspectRatioPresetRecords.js';

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
    buildChoicePropertyRecord('db-preset', 'aspect-ratio', 'Aspect ratio', 'auto', getAspectRatioPresetRecords()),
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
