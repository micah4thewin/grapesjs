import buildSchemaTextFieldMarkup from './buildSchemaTextFieldMarkup.js';

const buildWebsiteFieldsMarkup = (websiteRecord) =>
  [
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('website.name', 'Site name', '', websiteRecord.name),
    buildSchemaTextFieldMarkup('website.url', 'Site URL', '', websiteRecord.url),
    '</div>',
    buildSchemaTextFieldMarkup(
      'website.searchUrlTemplate',
      'Search URL template',
      'Optional. Use {search_term_string} as the query placeholder.',
      websiteRecord.searchUrlTemplate,
    ),
  ].join('');

export default buildWebsiteFieldsMarkup;
