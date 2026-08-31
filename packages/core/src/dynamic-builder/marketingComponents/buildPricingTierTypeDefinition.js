import buildPricingTierDefaultChildren from './buildPricingTierDefaultChildren.js';

const buildPricingTierTypeDefinition = () => ({
  type: 'db-pricing-tier',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'pricing-tier') && { type: 'db-pricing-tier' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Pricing tier',
      draggable: '[data-db-pricing-grid]',
      droppable: false,
      classes: ['db-pricing-tier'],
      attributes: { 'data-db-type': 'pricing-tier', 'data-db-featured': 'false' },
      components: buildPricingTierDefaultChildren({
        tierName: 'Starter',
        blurbText: 'Everything you need to launch your first site.',
        monthlyPrice: '$19',
        yearlyPrice: '$190',
        featureTexts: ['Up to 3 projects', 'Community support', 'Basic analytics'],
        ctaLabel: 'Start free trial',
        ctaVariant: 'outline',
      }),
      traits: [
        {
          type: 'checkbox',
          name: 'data-db-featured',
          label: 'Featured tier',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'false',
        },
      ],
    },
  },
});

export default buildPricingTierTypeDefinition;
