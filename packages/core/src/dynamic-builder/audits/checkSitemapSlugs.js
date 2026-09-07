import createFindingRecord from './createFindingRecord.js';
import getPageMetaRecord from '../support/getPageMetaRecord.js';
import listPagePathEntries from '../support/listPagePathEntries.js';
import resolvePageSeoRecord from './resolvePageSeoRecord.js';
import toSlugText from '../support/toSlugText.js';

const checkSitemapSlugs = (auditContext) => {
  const { editor } = auditContext;
  if (!editor.Pages || !editor.Pages.getAll) return [];
  const findings = [];
  const derivedAddressTexts = [];
  listPagePathEntries(editor).forEach((pathEntry) => {
    if (pathEntry.isMainPage) return;
    const pageSeo = resolvePageSeoRecord(getPageMetaRecord(editor, pathEntry.page));
    if (pageSeo.sitemapExclude === true || pageSeo.noindex === true) return;
    const pageName = String((pathEntry.page.getName && pathEntry.page.getName()) || '').trim();
    const explicitSlug = toSlugText(pageSeo.slug);
    const derivedName = explicitSlug || toSlugText(pageName);
    const pageDetails = { pageId: pathEntry.pageId, pageName: pageName || 'Untitled page', fixId: 'seo-field:slug' };
    if (!derivedName) {
      findings.push(
        createFindingRecord(
          'warning',
          'Sitemap',
          'A page has no name or slug, so its address will be ' + pathEntry.baseName + '.html.',
          'Give the page a name or set a slug in its SEO settings so visitors get a readable address.',
          pageDetails,
        ),
      );
      return;
    }
    if (pathEntry.baseName !== derivedName) {
      findings.push(
        createFindingRecord(
          'warning',
          'Sitemap',
          'Two pages share the address "' +
            derivedName +
            '"; "' +
            pageName +
            '" will be published as ' +
            pathEntry.baseName +
            '.html.',
          'Give it a unique name or slug so its links stay predictable.',
          pageDetails,
        ),
      );
      return;
    }
    if (!explicitSlug) derivedAddressTexts.push(pageName + ' becomes /' + pathEntry.baseName);
  });
  if (derivedAddressTexts.length) {
    findings.push(
      createFindingRecord(
        'info',
        'Sitemap',
        'Page addresses come from page names: ' + derivedAddressTexts.join(', ') + '.',
        'Set a slug in the page SEO settings if you want a different address; renaming the page changes it.',
      ),
    );
  }
  return findings;
};

export default checkSitemapSlugs;
