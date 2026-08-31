const buildSearchPreviewCardMarkup = () =>
  [
    '<div class="gjs-db-preview-card gjs-db-seo-search-preview">',
    '<span class="gjs-db-muted gjs-db-seo-preview-heading">Search preview</span>',
    '<div class="gjs-db-preview-url" data-db-seo-preview="url"></div>',
    '<div class="gjs-db-preview-title" data-db-seo-preview="title"></div>',
    '<div class="gjs-db-preview-description" data-db-seo-preview="description"></div>',
    '</div>',
  ].join('');

export default buildSearchPreviewCardMarkup;
