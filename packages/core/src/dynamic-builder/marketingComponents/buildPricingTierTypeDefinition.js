import appendPricingFeatureRow from './appendPricingFeatureRow.js';
import buildAddChildButtonTrait from './buildAddChildButtonTrait.js';
import buildPricingTierDefaultChildren from './buildPricingTierDefaultChildren.js';
import getPricingTierPresetRecords from './getPricingTierPresetRecords.js';

const buildPricingTierTypeDefinition = () => ({
  type: 'db-pricing-tier',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'pricing-tier') && { type: 'db-pricing-tier' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Plan',
      draggable: '[data-db-pricing-grid]',
      droppable: false,
      classes: ['db-pricing-tier'],
      attributes: {
        'data-db-type': 'pricing-tier',
        'data-db-featured': 'false',
        'data-db-amount': '19',
        'data-db-badge': 'Most popular',
      },
      components: buildPricingTierDefaultChildren(getPricingTierPresetRecords()[0]),
      traits: [
        { type: 'number', name: 'data-db-amount', label: 'Monthly price', min: 0, step: 0.01, placeholder: '19' },
        {
          type: 'checkbox',
          name: 'data-db-featured',
          label: 'Highlight this plan',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'false',
        },
        { type: 'text', name: 'data-db-badge', label: 'Badge on the highlighted plan', placeholder: 'Most popular' },
        buildAddChildButtonTrait('Add a feature row', appendPricingFeatureRow),
      ],
    },
  },
});

export default buildPricingTierTypeDefinition;
