import buildPageBasicsFieldsMarkup from './buildPageBasicsFieldsMarkup.js';
import buildPageOpenGraphFieldsMarkup from './buildPageOpenGraphFieldsMarkup.js';
import buildPageRobotsFieldsMarkup from './buildPageRobotsFieldsMarkup.js';
import buildPageTwitterFieldsMarkup from './buildPageTwitterFieldsMarkup.js';
import buildSearchPreviewCardMarkup from './buildSearchPreviewCardMarkup.js';
import buildSeoSuggestRowMarkup from './buildSeoSuggestRowMarkup.js';
import buildSocialPreviewCardMarkup from './buildSocialPreviewCardMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildPageSeoSectionMarkup = (pageSeoRecord, pageContext) =>
  [
    '<section class="gjs-db-seo-section" id="gjs-db-seo-panel-page" data-db-seo-section="page" role="tabpanel" tabindex="0" aria-labelledby="gjs-db-seo-tab-page" hidden>',
    '<div class="gjs-db-section-title">This page: ' +
      escapeHtmlText(pageContext.pageName || 'Untitled page') +
      '</div>',
    buildSeoSuggestRowMarkup(),
    buildPageBasicsFieldsMarkup(pageSeoRecord, pageContext),
    '<div class="gjs-db-grid-two gjs-db-seo-previews">',
    buildSearchPreviewCardMarkup(),
    buildSocialPreviewCardMarkup(),
    '</div>',
    buildPageRobotsFieldsMarkup(pageSeoRecord),
    buildPageOpenGraphFieldsMarkup(pageSeoRecord),
    buildPageTwitterFieldsMarkup(pageSeoRecord),
    '</section>',
  ].join('');

export default buildPageSeoSectionMarkup;
