import buildSharePreviewSwitcherMarkup from './buildSharePreviewSwitcherMarkup.js';

const buildSocialPreviewCardMarkup = () =>
  [
    '<div class="gjs-db-preview-card gjs-db-seo-social-preview" data-db-seo-social-card data-db-seo-active-platform="facebook">',
    '<div class="gjs-db-seo-preview-heading-row">',
    '<span class="gjs-db-muted gjs-db-seo-preview-heading">Share preview</span>',
    buildSharePreviewSwitcherMarkup('facebook'),
    '</div>',
    '<div class="gjs-db-seo-social-image gjs-db-seo-social-image-empty" data-db-seo-preview="image"></div>',
    '<div class="gjs-db-preview-url gjs-db-seo-social-domain" data-db-seo-preview="socialDomain"></div>',
    '<div class="gjs-db-preview-title" data-db-seo-preview="socialTitle"></div>',
    '<div class="gjs-db-preview-description" data-db-seo-preview="socialDescription"></div>',
    '<div class="gjs-db-seo-preview-note" data-db-seo-preview="socialNote" hidden></div>',
    '</div>',
  ].join('');

export default buildSocialPreviewCardMarkup;
