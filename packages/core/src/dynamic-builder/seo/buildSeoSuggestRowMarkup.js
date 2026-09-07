const buildSeoSuggestRowMarkup = () =>
  [
    '<div class="gjs-db-seo-suggest-row">',
    '<button type="button" class="gjs-db-button" data-db-seo-suggest>Suggest from page content</button>',
    '<span class="gjs-db-field-help">',
    'Fills the empty fields below from the page headline, first paragraph and first image. You can edit them before saving.',
    '</span>',
    '</div>',
  ].join('');

export default buildSeoSuggestRowMarkup;
