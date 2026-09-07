import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import appendFeatureCard from './appendFeatureCard.js';
import buildAddChildButtonTrait from './buildAddChildButtonTrait.js';
import buildFeatureCardRecord from './buildFeatureCardRecord.js';
import getFeaturePresetRecords from './getFeaturePresetRecords.js';

const buildFeaturesTypeDefinition = () => ({
  type: 'db-features',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'features') && { type: 'db-features' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Highlights',
      draggable: getDropTargetSelectors().sectionBody,
      droppable: '[data-db-type=feature-card]',
      classes: ['db-features'],
      attributes: { 'data-db-type': 'features', 'data-db-columns': '3' },
      components: getFeaturePresetRecords().map((featurePreset) => buildFeatureCardRecord(featurePreset)),
      traits: [
        {
          type: 'select',
          name: 'data-db-columns',
          label: 'Highlights per row',
          default: '3',
          options: [
            { id: '2', label: '2' },
            { id: '3', label: '3' },
            { id: '4', label: '4' },
          ],
        },
        buildAddChildButtonTrait('Add a highlight', appendFeatureCard),
      ],
    },
  },
});

export default buildFeaturesTypeDefinition;
