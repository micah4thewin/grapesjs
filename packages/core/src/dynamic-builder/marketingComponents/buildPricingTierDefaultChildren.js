import getIconMarkup from '../support/getIconMarkup.js';

const buildPricingTierDefaultChildren = (tierPreset) => [
  {
    tagName: 'h3',
    type: 'text',
    name: 'Tier name',
    classes: ['db-pricing-tier-name'],
    components: tierPreset.tierName,
  },
  {
    tagName: 'p',
    type: 'text',
    name: 'Tier blurb',
    classes: ['db-pricing-tier-blurb'],
    components: tierPreset.blurbText,
  },
  {
    tagName: 'p',
    name: 'Tier price',
    classes: ['db-pricing-price'],
    attributes: {
      'data-db-price-monthly': tierPreset.monthlyPrice,
      'data-db-price-yearly': tierPreset.yearlyPrice,
      'data-db-period-monthly': '/month',
      'data-db-period-yearly': '/year',
      'aria-live': 'polite',
    },
    traits: [
      { type: 'text', name: 'data-db-price-monthly', label: 'Monthly price' },
      { type: 'text', name: 'data-db-price-yearly', label: 'Yearly price' },
    ],
    components: [
      {
        tagName: 'span',
        name: 'Price value',
        classes: ['db-pricing-price-value'],
        attributes: { 'data-db-price-value': 'true' },
        components: tierPreset.monthlyPrice,
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
    name: 'Tier features',
    classes: ['db-pricing-features'],
    components: tierPreset.featureTexts.map((featureText) => ({
      tagName: 'li',
      name: 'Tier feature',
      classes: ['db-pricing-feature'],
      components: [
        { tagName: 'span', classes: ['db-pricing-check'], components: getIconMarkup('check', { size: 16 }) },
        { tagName: 'span', type: 'text', components: featureText },
      ],
    })),
  },
  {
    type: 'db-button',
    classes: ['db-button', 'db-pricing-cta'],
    attributes: { 'data-db-variant': tierPreset.ctaVariant, href: '#' },
    components: tierPreset.ctaLabel,
  },
];

export default buildPricingTierDefaultChildren;
