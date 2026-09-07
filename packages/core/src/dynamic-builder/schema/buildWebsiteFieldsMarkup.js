import buildSchemaTextFieldMarkup from './buildSchemaTextFieldMarkup.js';

const buildWebsiteFieldsMarkup = (websiteRecord) =>
  [
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup(
      'website.name',
      'Site name',
      'The name search engines may show instead of the address.',
      websiteRecord.name,
    ),
    buildSchemaTextFieldMarkup(
      'website.url',
      'Site address',
      'The home page address, for example https://www.example.com.',
      websiteRecord.url,
      { type: 'url', placeholder: 'https://www.example.com' },
    ),
    '</div>',
    buildSchemaTextFieldMarkup(
      'website.searchUrlTemplate',
      'Search address',
      'Optional. Only if the site has its own search page; use {search_term_string} where the words go.',
      websiteRecord.searchUrlTemplate,
      { placeholder: 'https://www.example.com/search?q={search_term_string}' },
    ),
  ].join('');

export default buildWebsiteFieldsMarkup;
