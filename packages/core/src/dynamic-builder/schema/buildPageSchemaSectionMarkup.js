import buildArticleFieldsMarkup from './buildArticleFieldsMarkup.js';
import buildEventFieldsMarkup from './buildEventFieldsMarkup.js';
import buildFaqFieldsMarkup from './buildFaqFieldsMarkup.js';
import buildProductFieldsMarkup from './buildProductFieldsMarkup.js';
import buildSchemaSaveRowMarkup from './buildSchemaSaveRowMarkup.js';
import buildSchemaSelectFieldMarkup from './buildSchemaSelectFieldMarkup.js';
import getIconMarkup from '../support/getIconMarkup.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildPageSchemaSectionMarkup = (pageSchemaRecord, faqEntryCount) => {
  const readTypeValues = (typeKey) => (isPlainRecord(pageSchemaRecord[typeKey]) ? pageSchemaRecord[typeKey] : {});
  return [
    '<section class="gjs-db-schema-section" data-db-schema-section="page" aria-label="Page structured data">',
    '<div class="gjs-db-section-title gjs-db-schema-title-row">',
    getIconMarkup('webpage', { size: 16 }),
    '<span>This page</span>',
    '<span data-db-schema-badge="page"></span>',
    '</div>',
    buildSchemaSelectFieldMarkup(
      'pageType',
      'Page type',
      'Controls the main JSON-LD record emitted for this page.',
      pageSchemaRecord.pageType || 'WebPage',
      [
        ['WebPage', 'Web page'],
        ['AboutPage', 'About page'],
        ['ContactPage', 'Contact page'],
        ['CollectionPage', 'Collection page'],
        ['Article', 'Article'],
        ['Product', 'Product'],
        ['Event', 'Event'],
        ['FAQPage', 'FAQ page'],
      ],
    ),
    buildArticleFieldsMarkup(readTypeValues('article')),
    buildProductFieldsMarkup(readTypeValues('product')),
    buildEventFieldsMarkup(readTypeValues('event')),
    buildFaqFieldsMarkup(faqEntryCount),
    buildSchemaSaveRowMarkup('page', 'Save page schema'),
    '</section>',
  ].join('');
};

export default buildPageSchemaSectionMarkup;
