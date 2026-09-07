import buildArticleFieldsMarkup from './buildArticleFieldsMarkup.js';
import buildEventFieldsMarkup from './buildEventFieldsMarkup.js';
import buildFaqFieldsMarkup from './buildFaqFieldsMarkup.js';
import buildProductFieldsMarkup from './buildProductFieldsMarkup.js';
import buildSchemaSaveRowMarkup from './buildSchemaSaveRowMarkup.js';
import buildSchemaSelectFieldMarkup from './buildSchemaSelectFieldMarkup.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getSchemaPageTypeOptions from './getSchemaPageTypeOptions.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildPageSchemaSectionMarkup = (pageSchemaRecord, faqEntryCount) => {
  const readTypeValues = (typeKey) => (isPlainRecord(pageSchemaRecord[typeKey]) ? pageSchemaRecord[typeKey] : {});
  return [
    '<section class="gjs-db-schema-section" id="gjs-db-schema-panel-page" data-db-schema-section="page"',
    ' role="tabpanel" tabindex="0" aria-labelledby="gjs-db-schema-tab-page" aria-label="Page structured data" hidden>',
    '<div class="gjs-db-section-title gjs-db-schema-title-row">',
    getIconMarkup('webpage', { size: 16 }),
    '<span>This page</span>',
    '<span class="gjs-db-schema-title-row" data-db-schema-badge="page"></span>',
    '</div>',
    buildSchemaSelectFieldMarkup(
      'pageType',
      'Page type',
      'What this page is about. Article, Product, Event and FAQ page can show extra details in search results.',
      pageSchemaRecord.pageType || 'WebPage',
      getSchemaPageTypeOptions(),
    ),
    buildArticleFieldsMarkup(readTypeValues('article')),
    buildProductFieldsMarkup(readTypeValues('product')),
    buildEventFieldsMarkup(readTypeValues('event')),
    buildFaqFieldsMarkup(faqEntryCount),
    buildSchemaSaveRowMarkup('page', 'Save page details'),
    '</section>',
  ].join('');
};

export default buildPageSchemaSectionMarkup;
