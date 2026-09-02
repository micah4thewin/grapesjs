import buildPageBasicsFieldsMarkup from './buildPageBasicsFieldsMarkup.js';
import buildPageOpenGraphFieldsMarkup from './buildPageOpenGraphFieldsMarkup.js';
import buildPageRobotsFieldsMarkup from './buildPageRobotsFieldsMarkup.js';
import buildPageTwitterFieldsMarkup from './buildPageTwitterFieldsMarkup.js';
import buildSearchPreviewCardMarkup from './buildSearchPreviewCardMarkup.js';
import buildSeoSaveRowMarkup from './buildSeoSaveRowMarkup.js';
import buildSocialPreviewCardMarkup from './buildSocialPreviewCardMarkup.js';

const buildPageSeoSectionMarkup = (pageSeoRecord) =>
  [
    '<section class="gjs-db-seo-section" id="gjs-db-seo-panel-page" data-db-seo-section="page" role="tabpanel" tabindex="0" aria-labelledby="gjs-db-seo-tab-page" hidden>',
    '<div class="gjs-db-section-title">This page</div>',
    buildPageBasicsFieldsMarkup(pageSeoRecord),
    '<div class="gjs-db-grid-two gjs-db-seo-previews">',
    buildSearchPreviewCardMarkup(),
    buildSocialPreviewCardMarkup(),
    '</div>',
    buildPageRobotsFieldsMarkup(pageSeoRecord),
    buildPageOpenGraphFieldsMarkup(pageSeoRecord),
    buildPageTwitterFieldsMarkup(pageSeoRecord),
    buildSeoSaveRowMarkup('page', 'Save page settings'),
    '</section>',
  ].join('');

export default buildPageSeoSectionMarkup;
