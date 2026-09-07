const getPricingTierPresetRecords = () => [
  {
    tierName: 'Starter',
    blurbText: 'For individuals who are just getting started.',
    monthlyAmount: 19,
    featureTexts: ['One project', 'Email support', 'Basic reports'],
    ctaLabel: 'Get started',
    ctaVariant: 'outline',
    featured: 'false',
  },
  {
    tierName: 'Growth',
    blurbText: 'For small teams that need a little more.',
    monthlyAmount: 49,
    featureTexts: ['Unlimited projects', 'Priority support', 'Advanced reports', 'Team access'],
    ctaLabel: 'Choose Growth',
    ctaVariant: 'primary',
    featured: 'true',
  },
  {
    tierName: 'Business',
    blurbText: 'For organisations with custom needs.',
    monthlyAmount: 99,
    featureTexts: ['Dedicated account manager', 'Custom integrations', 'Guaranteed uptime', 'Activity logs'],
    ctaLabel: 'Contact us',
    ctaVariant: 'outline',
    featured: 'false',
  },
];

export default getPricingTierPresetRecords;
