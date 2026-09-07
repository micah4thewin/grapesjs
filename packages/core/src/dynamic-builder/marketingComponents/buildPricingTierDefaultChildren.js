import buildPricingFeatureRowRecord from './buildPricingFeatureRowRecord.js';
import computeYearlyAmount from './computeYearlyAmount.js';
import formatPriceAmount from './formatPriceAmount.js';

const buildPricingTierDefaultChildren = (tierPreset) => {
  const monthlyText = formatPriceAmount(tierPreset.monthlyAmount, 'USD', '');
  const yearlyText = formatPriceAmount(computeYearlyAmount(tierPreset.monthlyAmount, 17), 'USD', '');
  return [
    {
      tagName: 'h3',
      type: 'text',
      name: 'Plan name',
      classes: ['db-pricing-tier-name'],
      components: tierPreset.tierName,
    },
    {
      tagName: 'p',
      type: 'text',
      name: 'Plan description',
      classes: ['db-pricing-tier-blurb'],
      components: tierPreset.blurbText,
    },
    {
      tagName: 'p',
      name: 'Price',
      classes: ['db-pricing-price'],
      attributes: {
        'data-db-price-monthly': monthlyText,
        'data-db-price-yearly': yearlyText,
        'data-db-period-monthly': '/month',
        'data-db-period-yearly': '/year',
        'aria-live': 'polite',
      },
      components: [
        {
          tagName: 'span',
          name: 'Price amount',
          classes: ['db-pricing-price-value'],
          attributes: { 'data-db-price-value': 'true' },
          components: monthlyText,
        },
        {
          tagName: 'span',
          name: 'Price period',
          classes: ['db-pricing-price-period'],
          attributes: { 'data-db-price-period': 'true' },
          components: '/month',
        },
      ],
    },
    {
      tagName: 'ul',
      name: 'Plan features',
      classes: ['db-pricing-features'],
      attributes: { 'data-db-pricing-features': 'true' },
      components: tierPreset.featureTexts.map((featureText) => buildPricingFeatureRowRecord(featureText)),
    },
    {
      type: 'db-button',
      name: 'Plan button',
      classes: ['db-button', 'db-button-' + tierPreset.ctaVariant, 'db-button-md', 'db-pricing-cta'],
      attributes: { 'data-db-variant': tierPreset.ctaVariant, 'data-db-size': 'md', href: '#' },
      components: tierPreset.ctaLabel,
    },
  ];
};

export default buildPricingTierDefaultChildren;
