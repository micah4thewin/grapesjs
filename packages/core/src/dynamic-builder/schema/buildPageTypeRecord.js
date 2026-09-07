import buildArticleRecordFields from './buildArticleRecordFields.js';
import buildEventRecordFields from './buildEventRecordFields.js';
import buildFaqPageRecordFields from './buildFaqPageRecordFields.js';
import buildProductRecordFields from './buildProductRecordFields.js';
import buildSchemaPageUrl from './buildSchemaPageUrl.js';
import collectFaqEntriesFromPage from './collectFaqEntriesFromPage.js';
import getPageMetaRecord from '../support/getPageMetaRecord.js';
import getSiteSeoRecord from '../seo/getSiteSeoRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import normalizeSchemaUrlValue from './normalizeSchemaUrlValue.js';
import pruneEmptySchemaValues from './pruneEmptySchemaValues.js';

const buildWebPageFields = (editor, page, pageUrl, websiteRecord) => {
  const pageSeoRecord = getPageMetaRecord(editor, page).seo;
  const websiteUrl = normalizeSchemaUrlValue(websiteRecord.url);
  return {
    name: page && page.getName ? page.getName() : '',
    url: pageUrl,
    description: isPlainRecord(pageSeoRecord) ? pageSeoRecord.description : '',
    isPartOf: websiteUrl ? { '@type': 'WebSite', url: websiteUrl, name: websiteRecord.name } : undefined,
  };
};

const buildPageTypeRecord = (editor, page, pageSchemaRecord, siteSchemaRecord) => {
  const schemaRecord = isPlainRecord(pageSchemaRecord) ? pageSchemaRecord : {};
  const siteRecord = isPlainRecord(siteSchemaRecord) ? siteSchemaRecord : {};
  const websiteRecord = isPlainRecord(siteRecord.website) ? siteRecord.website : {};
  const pageType = String(schemaRecord.pageType || 'WebPage').trim() || 'WebPage';
  const pageUrl = buildSchemaPageUrl(editor, page);
  const canonicalBase = String(getSiteSeoRecord(editor).canonicalBase || '').trim();
  const readTypeValues = (typeKey) => (isPlainRecord(schemaRecord[typeKey]) ? schemaRecord[typeKey] : {});
  let typeFields;
  if (pageType === 'Article') {
    typeFields = buildArticleRecordFields(readTypeValues('article'), pageUrl, canonicalBase, siteRecord.organization);
  } else if (pageType === 'Product')
    typeFields = buildProductRecordFields(readTypeValues('product'), pageUrl, canonicalBase);
  else if (pageType === 'Event') typeFields = buildEventRecordFields(readTypeValues('event'), pageUrl, canonicalBase);
  else if (pageType === 'FAQPage') typeFields = buildFaqPageRecordFields(collectFaqEntriesFromPage(editor, page));
  else typeFields = buildWebPageFields(editor, page, pageUrl, websiteRecord);
  return pruneEmptySchemaValues({ '@context': 'https://schema.org', '@type': pageType, ...typeFields }) || null;
};

export default buildPageTypeRecord;
