import buildChoicePropertyRecord from './buildChoicePropertyRecord.js';

const buildBackgroundsSectorDefinition = () => ({
  id: 'backgrounds',
  name: 'Backgrounds',
  open: false,
  properties: [
    'background-color',
    'background',
    buildChoicePropertyRecord('select', 'mix-blend-mode', 'Blend mode', 'normal', [
      'normal',
      'multiply',
      'screen',
      'overlay',
      'darken',
      'lighten',
      'color-dodge',
      'color-burn',
      'hard-light',
      'soft-light',
      'difference',
      'exclusion',
      'hue',
      'saturation',
      'color',
      'luminosity',
    ]),
  ],
});

export default buildBackgroundsSectorDefinition;
