import isPlainRecord from '../support/isPlainRecord.js';
import normalizeSchemaUrlValue from './normalizeSchemaUrlValue.js';
import pruneEmptySchemaValues from './pruneEmptySchemaValues.js';

const buildWebSiteRecord = (websiteValues) => {
  const websiteRecord = isPlainRecord(websiteValues) ? websiteValues : {};
  const websiteUrl = normalizeSchemaUrlValue(websiteRecord.url);
  const searchUrlTemplate = normalizeSchemaUrlValue(websiteRecord.searchUrlTemplate, websiteUrl);
  return (
    pruneEmptySchemaValues({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: websiteRecord.name,
      url: websiteUrl,
      potentialAction: searchUrlTemplate
        ? {
            '@type': 'SearchAction',
            target: searchUrlTemplate,
            'query-input': 'required name=search_term_string',
          }
        : undefined,
    }) || null
  );
};

export default buildWebSiteRecord;
