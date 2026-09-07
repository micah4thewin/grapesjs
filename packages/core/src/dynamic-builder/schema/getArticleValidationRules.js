import getSchemaFieldFormatRecords from './getSchemaFieldFormatRecords.js';

const getArticleValidationRules = () => ({
  required: ['headline', 'datePublished'],
  recommended: ['description', 'image', 'authorName', 'dateModified'],
  formats: getSchemaFieldFormatRecords().article,
});

export default getArticleValidationRules;
