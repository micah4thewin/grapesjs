import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildTestLinkMarkup = (testUrl) =>
  testUrl
    ? '<a class="gjs-db-button" href="https://search.google.com/test/rich-results?url=' +
      escapeHtmlText(encodeURIComponent(testUrl)) +
      '" target="_blank" rel="noopener noreferrer" data-db-schema-test-link>' +
      getIconMarkup('externalLink', { size: 14 }) +
      'Test with Google</a>'
    : '<span class="gjs-db-muted">Set a website address in SEO settings to test the live page with Google.</span>';

const buildSchemaPreviewSectionMarkup = (testUrl) =>
  [
    '<section class="gjs-db-schema-section" id="gjs-db-schema-panel-preview" data-db-schema-section="preview"',
    ' role="tabpanel" tabindex="0" aria-labelledby="gjs-db-schema-tab-preview" hidden>',
    '<div class="gjs-db-section-title gjs-db-schema-title-row">',
    getIconMarkup('schema', { size: 16 }),
    '<span>JSON-LD preview</span>',
    '<span class="gjs-db-schema-title-row" data-db-schema-readiness></span>',
    '</div>',
    '<textarea class="gjs-db-field-input gjs-db-schema-preview" data-db-schema-preview readonly',
    ' rows="12" aria-label="JSON-LD output preview" spellcheck="false"></textarea>',
    '<span class="gjs-db-field-help gjs-db-muted" data-db-schema-preview-note>',
    'Preview of the values above. Save to publish.</span>',
    '<div class="gjs-db-button-row gjs-db-schema-preview-actions">',
    '<button type="button" class="gjs-db-button" data-db-schema-copy>' +
      getIconMarkup('copy', { size: 14 }) +
      'Copy JSON-LD</button>',
    buildTestLinkMarkup(testUrl),
    '<span class="gjs-db-status" data-db-schema-status="preview" role="status"></span>',
    '</div>',
    '</section>',
  ].join('');

export default buildSchemaPreviewSectionMarkup;
