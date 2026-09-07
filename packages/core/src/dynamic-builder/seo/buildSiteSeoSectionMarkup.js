import buildSiteSeoBasicsFieldsMarkup from './buildSiteSeoBasicsFieldsMarkup.js';
import buildSiteSeoSharingFieldsMarkup from './buildSiteSeoSharingFieldsMarkup.js';

const buildSiteSeoSectionMarkup = (siteSeoRecord) =>
  [
    '<section class="gjs-db-seo-section" id="gjs-db-seo-panel-site" data-db-seo-section="site" role="tabpanel" tabindex="0" aria-labelledby="gjs-db-seo-tab-site">',
    '<div class="gjs-db-section-title">Site defaults</div>',
    buildSiteSeoBasicsFieldsMarkup(siteSeoRecord),
    '<div class="gjs-db-section-title">Sharing and crawling</div>',
    buildSiteSeoSharingFieldsMarkup(siteSeoRecord),
    '</section>',
  ].join('');

export default buildSiteSeoSectionMarkup;
