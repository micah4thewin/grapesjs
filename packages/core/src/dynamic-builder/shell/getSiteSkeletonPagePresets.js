const getSiteSkeletonPagePresets = () => [
  { presetId: 'about', pageName: 'About', sectionType: 'db-testimonial', checkedByDefault: true },
  { presetId: 'services', pageName: 'Services', sectionType: 'db-features', checkedByDefault: false },
  { presetId: 'pricing', pageName: 'Pricing', sectionType: 'db-pricing', checkedByDefault: false },
  { presetId: 'contact', pageName: 'Contact', sectionType: 'db-contact', checkedByDefault: true },
];

export default getSiteSkeletonPagePresets;
