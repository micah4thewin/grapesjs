import buildPageSchemaSectionMarkup from './buildPageSchemaSectionMarkup.js';
import buildSchemaPreviewSectionMarkup from './buildSchemaPreviewSectionMarkup.js';
import buildSiteSchemaSectionMarkup from './buildSiteSchemaSectionMarkup.js';

const buildSchemaModalMarkup = (siteSchemaRecord, pageSchemaRecord, faqEntryCount) =>
  [
    '<div class="gjs-db-form gjs-db-schema-modal" data-db-schema-root>',
    buildSiteSchemaSectionMarkup(siteSchemaRecord),
    buildPageSchemaSectionMarkup(pageSchemaRecord, faqEntryCount),
    buildSchemaPreviewSectionMarkup(),
    '</div>',
  ].join('');

export default buildSchemaModalMarkup;
