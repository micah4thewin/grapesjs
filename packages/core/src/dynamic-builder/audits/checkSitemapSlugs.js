import createFindingRecord from './createFindingRecord.js';
import getPageMetaRecord from '../support/getPageMetaRecord.js';
import resolvePageSeoRecord from './resolvePageSeoRecord.js';

const checkSitemapSlugs = (auditContext) => {
  const { editor } = auditContext;
  const pagesModule = editor.Pages;
  if (!pagesModule || !pagesModule.getAll) return [];
  const mainPage = pagesModule.getMain ? pagesModule.getMain() : null;
  const findings = [];
  pagesModule.getAll().forEach((page) => {
    if (page === mainPage) return;
    const pageSeo = resolvePageSeoRecord(getPageMetaRecord(editor, page));
    if (pageSeo.sitemapExclude === true || pageSeo.noindex === true) return;
    if (String(pageSeo.slug || '').trim()) return;
    const pageName = (page.getName && page.getName()) || page.id || 'untitled';
    findings.push(
      createFindingRecord(
        'warning',
        'Sitemap',
        'Page "' + pageName + '" has no slug, so it cannot appear in the sitemap.',
        'Set a slug in the page SEO settings so the page gets a stable URL.',
      ),
    );
  });
  return findings;
};

export default checkSitemapSlugs;
