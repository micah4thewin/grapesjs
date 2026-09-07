import buildPricingTierDefaultChildren from './buildPricingTierDefaultChildren.js';

const buildPricingTierRecord = (tierPreset) => ({
  type: 'db-pricing-tier',
  attributes: {
    'data-db-featured': tierPreset.featured || 'false',
    'data-db-amount': String(tierPreset.monthlyAmount),
    'data-db-badge': 'Most popular',
  },
  components: buildPricingTierDefaultChildren(tierPreset),
});

export default buildPricingTierRecord;
