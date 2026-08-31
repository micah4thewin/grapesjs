import buildPageSeoSectionMarkup from './buildPageSeoSectionMarkup.js';
import buildSiteSeoSectionMarkup from './buildSiteSeoSectionMarkup.js';

const buildSeoModalMarkup = (siteSeoRecord, pageSeoRecord) =>
  [
    '<div class="gjs-db-form gjs-db-seo-modal" data-db-seo-root>',
    '<div class="gjs-db-button-row gjs-db-seo-tabs" role="tablist" aria-label="SEO settings sections">',
    '<button type="button" class="gjs-db-button" role="tab" data-db-seo-tab="site">Site defaults</button>',
    '<button type="button" class="gjs-db-button" role="tab" data-db-seo-tab="page">This page</button>',
    '</div>',
    buildSiteSeoSectionMarkup(siteSeoRecord),
    buildPageSeoSectionMarkup(pageSeoRecord),
    '</div>',
  ].join('');

export default buildSeoModalMarkup;
