import buildPricingTierDefaultChildren from './buildPricingTierDefaultChildren.js';

const buildPricingDefaultChildren = () => {
  const tierPresets = [
    {
      tierName: 'Starter',
      blurbText: 'Everything you need to launch your first site.',
      monthlyPrice: '$19',
      yearlyPrice: '$190',
      featureTexts: ['Up to 3 projects', 'Community support', 'Basic analytics'],
      ctaLabel: 'Start free trial',
      ctaVariant: 'outline',
      featured: 'false',
    },
    {
      tierName: 'Growth',
      blurbText: 'For teams shipping sites every week.',
      monthlyPrice: '$49',
      yearlyPrice: '$490',
      featureTexts: ['Unlimited projects', 'Priority support', 'Advanced analytics', 'Team roles'],
      ctaLabel: 'Choose Growth',
      ctaVariant: 'primary',
      featured: 'true',
    },
    {
      tierName: 'Scale',
      blurbText: 'Advanced controls for larger organizations.',
      monthlyPrice: '$99',
      yearlyPrice: '$990',
      featureTexts: ['Dedicated success manager', 'Custom integrations', 'SLA-backed uptime', 'Audit logs'],
      ctaLabel: 'Talk to sales',
      ctaVariant: 'outline',
      featured: 'false',
    },
  ];
  const buildToggleButton = (billingPeriod, buttonLabel, isPressed) => ({
    tagName: 'button',
    name: buttonLabel + ' billing toggle',
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
        { tagName: 'h2', type: 'text', classes: ['db-pricing-title'], components: 'Simple, honest pricing' },
        {
          tagName: 'p',
          type: 'text',
          classes: ['db-pricing-subtitle'],
          components: 'Switch between monthly and yearly billing at any time. Yearly plans get two months free.',
        },
        {
          tagName: 'div',
          name: 'Billing toggle',
          classes: ['db-pricing-toggle'],
          attributes: { role: 'group', 'aria-label': 'Billing period' },
          components: [buildToggleButton('monthly', 'Monthly', 'true'), buildToggleButton('yearly', 'Yearly', 'false')],
        },
      ],
    },
    {
      tagName: 'div',
      name: 'Pricing tiers',
      classes: ['db-pricing-grid'],
      attributes: { 'data-db-pricing-grid': 'true' },
      droppable: '[data-db-type=pricing-tier]',
      components: tierPresets.map((tierPreset) => ({
        type: 'db-pricing-tier',
        attributes: { 'data-db-featured': tierPreset.featured },
        components: buildPricingTierDefaultChildren(tierPreset),
      })),
    },
  ];
};

export default buildPricingDefaultChildren;
