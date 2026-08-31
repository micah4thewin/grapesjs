import getIconMarkup from '../support/getIconMarkup.js';

const buildSchemaPreviewSectionMarkup = () =>
  [
    '<section class="gjs-db-schema-section" aria-label="JSON-LD preview">',
    '<div class="gjs-db-section-title gjs-db-schema-title-row">',
    getIconMarkup('schema', { size: 16 }),
    '<span>JSON-LD preview</span>',
    '</div>',
    '<textarea class="gjs-db-field-input gjs-db-schema-preview" data-db-schema-preview readonly',
    ' rows="12" aria-label="JSON-LD output preview" spellcheck="false"></textarea>',
    '<span class="gjs-db-field-help gjs-db-muted">Exactly what will be published for the current page.</span>',
    '</section>',
  ].join('');

export default buildSchemaPreviewSectionMarkup;
