const buildTextContentRecord = (bodyText, variantName) =>
  variantName
    ? { type: 'db-text', attributes: { 'data-db-variant': variantName }, components: bodyText }
    : { type: 'db-text', components: bodyText };

export default buildTextContentRecord;
