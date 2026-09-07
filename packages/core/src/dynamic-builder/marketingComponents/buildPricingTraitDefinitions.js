import appendPricingTier from './appendPricingTier.js';
import buildAddChildButtonTrait from './buildAddChildButtonTrait.js';
import buildMarketingSectionTraits from './buildMarketingSectionTraits.js';
import getCurrencyOptionRecords from './getCurrencyOptionRecords.js';

const buildPricingTraitDefinitions = () => {
  const sectionTraits = buildMarketingSectionTraits('default', 'pricing');
  return [
    {
      type: 'select',
      name: 'data-db-currency',
      label: 'Currency',
      default: 'USD',
      options: getCurrencyOptionRecords(),
    },
    {
      type: 'number',
      name: 'data-db-yearly-discount',
      label: 'Yearly discount (%)',
      min: 0,
      max: 100,
      step: 1,
      placeholder: '17',
    },
    {
      type: 'select',
      name: 'data-db-billing-default',
      label: 'Period shown first',
      default: 'monthly',
      options: [
        { id: 'monthly', label: 'Monthly' },
        { id: 'yearly', label: 'Yearly' },
      ],
    },
    {
      type: 'checkbox',
      name: 'data-db-billing-toggle',
      label: 'Show the monthly / yearly switch',
      valueTrue: 'true',
      valueFalse: 'false',
      default: 'true',
    },
    { type: 'text', name: 'data-db-period-monthly', label: 'Text after the monthly price', placeholder: '/month' },
    { type: 'text', name: 'data-db-period-yearly', label: 'Text after the yearly price', placeholder: '/year' },
    {
      type: 'text',
      name: 'data-db-save-label',
      label: 'Savings badge ({percent} = discount)',
      placeholder: 'Save {percent}%',
    },
    buildAddChildButtonTrait('Add a plan', appendPricingTier),
    ...sectionTraits,
  ];
};

export default buildPricingTraitDefinitions;
