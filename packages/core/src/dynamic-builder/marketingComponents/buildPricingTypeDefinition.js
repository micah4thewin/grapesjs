import buildPricingDefaultChildren from './buildPricingDefaultChildren.js';
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
      attributes: { 'data-db-type': 'pricing', 'data-db-billing-default': 'monthly' },
      script: runPricingToggleBehavior,
      components: buildPricingDefaultChildren(),
      traits: [
        {
          type: 'select',
          name: 'data-db-billing-default',
          label: 'Default billing period',
          default: 'monthly',
          options: [
            { id: 'monthly', label: 'Monthly' },
            { id: 'yearly', label: 'Yearly' },
          ],
        },
        { type: 'text', name: 'id', label: 'Anchor id', placeholder: 'pricing' },
      ],
    },
  },
});

export default buildPricingTypeDefinition;
