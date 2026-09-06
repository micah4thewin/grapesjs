import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import buildFeatureCardChildComponents from './buildFeatureCardChildComponents.js';

const buildFeaturesTypeDefinition = () => ({
  type: 'db-features',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'features') && { type: 'db-features' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Features grid',
      draggable: getDropTargetSelectors().sectionBody,
      droppable: '[data-db-type=feature-card]',
      classes: ['db-features'],
      attributes: { 'data-db-type': 'features', 'data-db-columns': '3' },
      components: [
        {
          type: 'db-feature-card',
          components: buildFeatureCardChildComponents(
            'performance',
            'Fast by default',
            'Ship pages that load instantly thanks to optimized assets and clean, semantic markup.',
          ),
        },
        {
          type: 'db-feature-card',
          components: buildFeatureCardChildComponents(
            'security',
            'Secure foundations',
            'Safe defaults, accessible patterns, and best-practice markup protect every visitor.',
          ),
        },
        {
          type: 'db-feature-card',
          components: buildFeatureCardChildComponents(
            'effects',
            'Delightful details',
            'Subtle motion and polished interactions make every page feel considered and alive.',
          ),
        },
      ],
      traits: [
        {
          type: 'select',
          name: 'data-db-columns',
          label: 'Columns',
          default: '3',
          options: [
            { id: '2', label: '2 columns' },
            { id: '3', label: '3 columns' },
            { id: '4', label: '4 columns' },
          ],
        },
      ],
    },
  },
});

export default buildFeaturesTypeDefinition;
