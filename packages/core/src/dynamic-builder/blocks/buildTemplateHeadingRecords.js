const buildTemplateHeadingRecords = (headingText, introText) => [
  { type: 'db-heading', components: [{ type: 'textnode', content: headingText }] },
  ...(introText ? [{ type: 'db-text', components: [{ type: 'textnode', content: introText }] }] : []),
];

export default buildTemplateHeadingRecords;
