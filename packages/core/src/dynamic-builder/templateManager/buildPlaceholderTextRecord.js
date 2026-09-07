const buildPlaceholderTextRecord = (bodyText, variantName) => ({
  type: 'db-text',
  attributes: {
    'data-db-placeholder': 'true',
    ...(variantName ? { 'data-db-variant': variantName } : {}),
  },
  components: bodyText,
});

export default buildPlaceholderTextRecord;
