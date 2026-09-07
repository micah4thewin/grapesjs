const buildMarketingSectionIntroRecords = (typeName) => {
  const headingTexts = {
    'db-features': 'Why choose us',
    'db-testimonial': 'What our customers say',
    'db-team-member': 'Meet the team',
    'db-logo-cloud': 'Trusted by',
    'db-stats': 'A few numbers we are proud of',
  };
  const headingText = headingTexts[typeName];
  if (!headingText) return [];
  return [{ type: 'db-heading', attributes: { 'data-db-level': '2' }, components: headingText }];
};

export default buildMarketingSectionIntroRecords;
