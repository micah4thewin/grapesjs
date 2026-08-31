import buildChoicePropertyRecord from './buildChoicePropertyRecord.js';

const buildTypographySectorDefinition = () => ({
  id: 'typography',
  name: 'Typography',
  open: true,
  properties: [
    'font-family',
    'font-size',
    'font-weight',
    buildChoicePropertyRecord('radio', 'font-style', 'Font style', 'normal', ['normal', 'italic', 'oblique']),
    'line-height',
    'letter-spacing',
    'color',
    'text-align',
    buildChoicePropertyRecord('select', 'text-transform', 'Text transform', 'none', [
      'none',
      'capitalize',
      'uppercase',
      'lowercase',
    ]),
    buildChoicePropertyRecord('select', 'text-decoration', 'Text decoration', 'none', [
      'none',
      'underline',
      'overline',
      'line-through',
    ]),
    'text-shadow',
    buildChoicePropertyRecord('select', 'white-space', 'White space', 'normal', [
      'normal',
      'nowrap',
      'pre',
      'pre-wrap',
      'pre-line',
      'break-spaces',
    ]),
    buildChoicePropertyRecord('select', 'word-break', 'Word break', 'normal', [
      'normal',
      'break-all',
      'keep-all',
      'break-word',
    ]),
  ],
});

export default buildTypographySectorDefinition;
