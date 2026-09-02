import buildArticleRecordFields from './buildArticleRecordFields.js';
import buildEventRecordFields from './buildEventRecordFields.js';
import buildFaqPageRecordFields from './buildFaqPageRecordFields.js';
import buildProductRecordFields from './buildProductRecordFields.js';
import buildSchemaPageUrl from './buildSchemaPageUrl.js';
import collectFaqEntriesFromPage from './collectFaqEntriesFromPage.js';
import getPageMetaRecord from '../support/getPageMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import pruneEmptySchemaValues from './pruneEmptySchemaValues.js';

const buildPageTypeRecord = (editor, page, pageSchemaRecord) => {
  const schemaRecord = isPlainRecord(pageSchemaRecord) ? pageSchemaRecord : {};
  const pageType = String(schemaRecord.pageType || 'WebPage').trim() || 'WebPage';
  const pageUrl = buildSchemaPageUrl(editor, page);
  const readTypeValues = (typeKey) => (isPlainRecord(schemaRecord[typeKey]) ? schemaRecord[typeKey] : {});
  let typeFields;
  if (pageType === 'Article') typeFields = buildArticleRecordFields(readTypeValues('article'), pageUrl);
  else if (pageType === 'Product') typeFields = buildProductRecordFields(readTypeValues('product'), pageUrl);
  else if (pageType === 'Event') typeFields = buildEventRecordFields(readTypeValues('event'), pageUrl);
  else if (pageType === 'FAQPage') typeFields = buildFaqPageRecordFields(collectFaqEntriesFromPage(editor, page));
  else {
    const pageSeoRecord = getPageMetaRecord(editor, page).seo;
    typeFields = {
      name: page && page.getName ? page.getName() : '',
      url: pageUrl,
      description: isPlainRecord(pageSeoRecord) ? pageSeoRecord.description : '',
    };
  }
  return pruneEmptySchemaValues({ '@context': 'https://schema.org', '@type': pageType, ...typeFields }) || null;
};

export default buildPageTypeRecord;
