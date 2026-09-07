import formatStatNumber from './formatStatNumber.js';

const buildStatChildComponents = (statPreset) => [
  {
    tagName: 'strong',
    name: 'Number',
    classes: ['db-stat-value'],
    attributes: { 'data-db-stat-value': 'true' },
    components: (statPreset.prefix || '') + formatStatNumber(statPreset.target, '') + (statPreset.suffix || ''),
  },
  {
    tagName: 'span',
    type: 'text',
    name: 'Label',
    classes: ['db-stat-label'],
    components: statPreset.label,
  },
];

export default buildStatChildComponents;
