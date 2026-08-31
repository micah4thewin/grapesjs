import isPlainRecord from '../support/isPlainRecord.js';
import pruneEmptySchemaValues from './pruneEmptySchemaValues.js';

const buildWebSiteRecord = (websiteValues) => {
  const websiteRecord = isPlainRecord(websiteValues) ? websiteValues : {};
  const searchUrlTemplate = String(websiteRecord.searchUrlTemplate || '').trim();
  return (
    pruneEmptySchemaValues({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: websiteRecord.name,
      url: websiteRecord.url,
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
