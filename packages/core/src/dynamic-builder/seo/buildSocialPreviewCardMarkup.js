const buildSocialPreviewCardMarkup = () =>
  [
    '<div class="gjs-db-preview-card gjs-db-seo-social-preview">',
    '<span class="gjs-db-muted gjs-db-seo-preview-heading">Share preview</span>',
    '<div class="gjs-db-seo-social-image gjs-db-seo-social-image-empty" data-db-seo-preview="image"></div>',
    '<div class="gjs-db-preview-title" data-db-seo-preview="socialTitle"></div>',
    '<div class="gjs-db-preview-description" data-db-seo-preview="socialDescription"></div>',
    '</div>',
  ].join('');

export default buildSocialPreviewCardMarkup;
