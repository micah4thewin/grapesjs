import buildFeatureCardChildComponents from './buildFeatureCardChildComponents.js';
import getFeaturePresetRecords from './getFeaturePresetRecords.js';

const buildFeatureCardTypeDefinition = () => ({
  type: 'db-feature-card',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'feature-card') && { type: 'db-feature-card' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Highlight',
      draggable: '[data-db-type=features]',
      droppable: false,
      classes: ['db-feature-card'],
      attributes: { 'data-db-type': 'feature-card' },
      components: buildFeatureCardChildComponents(getFeaturePresetRecords()[0]),
    },
  },
});

export default buildFeatureCardTypeDefinition;
