import buildPricingDefaultChildren from './buildPricingDefaultChildren.js';
import buildPricingTraitDefinitions from './buildPricingTraitDefinitions.js';
import runPricingToggleBehavior from './runPricingToggleBehavior.js';

const buildPricingTypeDefinition = () => ({
  type: 'db-pricing',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'pricing') && { type: 'db-pricing' },
  model: {
    defaults: {
      tagName: 'section',
      name: 'Pricing',
      draggable: '[data-gjs-type=wrapper]',
      droppable: false,
      classes: ['db-pricing'],
      attributes: {
        'data-db-type': 'pricing',
        'data-db-theme': 'default',
        'data-db-billing-default': 'monthly',
        'data-db-billing-toggle': 'true',
        'data-db-currency': 'USD',
        'data-db-yearly-discount': '17',
      },
      script: runPricingToggleBehavior,
      components: buildPricingDefaultChildren(),
      traits: buildPricingTraitDefinitions(),
    },
  },
});

export default buildPricingTypeDefinition;
