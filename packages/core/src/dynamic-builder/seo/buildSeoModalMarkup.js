import buildPageSeoSectionMarkup from './buildPageSeoSectionMarkup.js';
import buildSeoSaveRowMarkup from './buildSeoSaveRowMarkup.js';
import buildSeoTabButtonMarkup from './buildSeoTabButtonMarkup.js';
import buildSiteSeoSectionMarkup from './buildSiteSeoSectionMarkup.js';

const buildSeoModalMarkup = (siteSeoRecord, pageSeoRecord, pageContext) =>
  [
    '<div class="gjs-db-form gjs-db-seo-modal" data-db-seo-root>',
    '<div class="gjs-db-button-row gjs-db-seo-tabs" role="tablist" aria-label="SEO settings sections">',
    buildSeoTabButtonMarkup('site', 'Site defaults'),
    buildSeoTabButtonMarkup('page', 'This page: ' + (pageContext.pageName || 'Untitled page')),
    '</div>',
    buildSiteSeoSectionMarkup(siteSeoRecord),
    buildPageSeoSectionMarkup(pageSeoRecord, pageContext),
    buildSeoSaveRowMarkup(),
    '</div>',
  ].join('');

export default buildSeoModalMarkup;
