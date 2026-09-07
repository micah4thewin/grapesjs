import buildPricingTierRecord from './buildPricingTierRecord.js';
import getPricingTierPresetRecords from './getPricingTierPresetRecords.js';

const buildPricingDefaultChildren = () => {
  const buildToggleButton = (billingPeriod, buttonLabel, isPressed) => ({
    tagName: 'button',
    type: 'text',
    name: buttonLabel + ' switch',
    classes: ['db-pricing-toggle-button'],
    attributes: { type: 'button', 'data-db-billing': billingPeriod, 'aria-pressed': isPressed },
    components: buttonLabel,
  });
  return [
    {
      tagName: 'div',
      name: 'Pricing header',
      classes: ['db-pricing-header'],
      components: [
        {
          tagName: 'h2',
          type: 'text',
          name: 'Pricing title',
          classes: ['db-pricing-title'],
          components: 'Simple, transparent pricing',
        },
        {
          tagName: 'p',
          type: 'text',
          name: 'Pricing subtitle',
          classes: ['db-pricing-subtitle'],
          components: 'Pick the plan that fits you today and change it whenever you need to.',
        },
        {
          tagName: 'div',
          name: 'Billing switch',
          classes: ['db-pricing-toggle'],
          attributes: { role: 'group', 'aria-label': 'Billing period' },
          components: [
            buildToggleButton('monthly', 'Monthly', 'true'),
            buildToggleButton('yearly', 'Yearly', 'false'),
            {
              tagName: 'span',
              name: 'Savings badge',
              classes: ['db-pricing-save'],
              attributes: { 'data-db-pricing-save': 'true' },
              components: 'Save 17%',
            },
          ],
        },
      ],
    },
    {
      tagName: 'div',
      name: 'Plans',
      classes: ['db-pricing-grid'],
      attributes: { 'data-db-pricing-grid': 'true' },
      droppable: '[data-db-type=pricing-tier]',
      components: getPricingTierPresetRecords().map((tierPreset) => buildPricingTierRecord(tierPreset)),
    },
  ];
};

export default buildPricingDefaultChildren;
