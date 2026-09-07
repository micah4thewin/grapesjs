import getIconMarkup from '../support/getIconMarkup.js';

const buildPricingFeatureRowRecord = (featureText) => ({
  tagName: 'li',
  name: 'Plan feature',
  classes: ['db-pricing-feature'],
  components: [
    {
      tagName: 'span',
      name: 'Check icon',
      classes: ['db-pricing-check'],
      components: getIconMarkup('check', { size: 16 }),
    },
    { tagName: 'span', type: 'text', name: 'Feature text', components: featureText },
  ],
});

export default buildPricingFeatureRowRecord;
