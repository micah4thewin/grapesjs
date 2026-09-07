import buildPublisherRecord from './buildPublisherRecord.js';
import normalizeSchemaUrlValue from './normalizeSchemaUrlValue.js';

const buildArticleRecordFields = (articleValues, pageUrl, canonicalBase, organizationValues) => ({
  headline: articleValues.headline,
  description: articleValues.description,
  image: normalizeSchemaUrlValue(articleValues.image, canonicalBase),
  author: {
    '@type': 'Person',
    name: articleValues.authorName,
  },
  publisher: buildPublisherRecord(organizationValues),
  datePublished: articleValues.datePublished,
  dateModified: articleValues.dateModified || articleValues.datePublished,
  mainEntityOfPage: pageUrl,
});

export default buildArticleRecordFields;
