const buildPlaceholderHeadingRecord = (headingLevel, headingText, sizeName) => ({
  type: 'db-heading',
  attributes: {
    'data-db-level': String(headingLevel),
    'data-db-placeholder': 'true',
    ...(sizeName ? { 'data-db-size': sizeName } : {}),
  },
  components: headingText,
});

export default buildPlaceholderHeadingRecord;
