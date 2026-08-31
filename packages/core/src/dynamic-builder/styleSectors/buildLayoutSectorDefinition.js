import buildChoicePropertyRecord from './buildChoicePropertyRecord.js';
import buildNumberPropertyRecord from './buildNumberPropertyRecord.js';

const buildLayoutSectorDefinition = () => ({
  id: 'layout',
  name: 'Layout',
  open: true,
  properties: [
    buildChoicePropertyRecord('select', 'display', 'Display', 'block', [
      'block',
      'inline',
      'inline-block',
      'flex',
      'inline-flex',
      'grid',
      'inline-grid',
      'none',
    ]),
    buildChoicePropertyRecord('select', 'position', 'Position', 'static', [
      'static',
      'relative',
      'absolute',
      'fixed',
      'sticky',
    ]),
    'top',
    'right',
    'bottom',
    'left',
    buildNumberPropertyRecord('z-index', 'Z index', 'auto', { units: [], fixedValues: ['auto'] }),
    'overflow',
    'float',
    buildChoicePropertyRecord('select', 'visibility', 'Visibility', 'visible', ['visible', 'hidden', 'collapse']),
    'cursor',
  ],
});

export default buildLayoutSectorDefinition;
