import buildFeatureCardChildComponents from './buildFeatureCardChildComponents.js';

const buildFeatureCardTypeDefinition = () => ({
  type: 'db-feature-card',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'feature-card') && { type: 'db-feature-card' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Feature card',
      draggable: '[data-db-type=features]',
      droppable: false,
      classes: ['db-feature-card'],
      attributes: { 'data-db-type': 'feature-card' },
      components: buildFeatureCardChildComponents(
        'star',
        'Fast by default',
        'Ship pages that load instantly thanks to optimized assets and clean, semantic markup.',
      ),
    },
  },
});

export default buildFeatureCardTypeDefinition;
