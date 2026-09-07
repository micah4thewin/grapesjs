import buildPageSchemaSectionMarkup from './buildPageSchemaSectionMarkup.js';
import buildSchemaPreviewSectionMarkup from './buildSchemaPreviewSectionMarkup.js';
import buildSchemaTabsMarkup from './buildSchemaTabsMarkup.js';
import buildSiteSchemaSectionMarkup from './buildSiteSchemaSectionMarkup.js';

const buildSchemaModalMarkup = (siteSchemaRecord, pageSchemaRecord, faqEntryCount, testUrl) =>
  [
    '<div class="gjs-db-form gjs-db-schema-modal" data-db-schema-root>',
    '<p class="gjs-db-muted gjs-db-schema-intro">Structured data tells search engines who is behind the site and',
    ' what each page is about, so results can show extra details such as prices, dates and questions.</p>',
    buildSchemaTabsMarkup(),
    buildSiteSchemaSectionMarkup(siteSchemaRecord),
    buildPageSchemaSectionMarkup(pageSchemaRecord, faqEntryCount),
    buildSchemaPreviewSectionMarkup(testUrl),
    '</div>',
  ].join('');

export default buildSchemaModalMarkup;
