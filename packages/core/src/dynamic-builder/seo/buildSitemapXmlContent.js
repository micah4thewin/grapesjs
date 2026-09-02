import buildPageCanonicalUrl from './buildPageCanonicalUrl.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getPageSeoRecord from './getPageSeoRecord.js';
import getSiteSeoRecord from './getSiteSeoRecord.js';
import trimCanonicalBaseUrl from './trimCanonicalBaseUrl.js';

const resolveUrlOriginText = (urlText) => {
  try {
    return new URL(urlText).origin;
  } catch (parseError) {
    return '';
  }
};

const buildSitemapXmlContent = (editor) => {
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  const siteOrigin = resolveUrlOriginText(trimCanonicalBaseUrl(getSiteSeoRecord(editor).canonicalBase));
  const seenUrls = [];
  const urlLines = [];
  pageList.forEach((sitePage) => {
    const pageSeoRecord = getPageSeoRecord(editor, sitePage);
    if (pageSeoRecord.noindex === true || pageSeoRecord.sitemapExclude === true) return;
    const pageUrl = buildPageCanonicalUrl(editor, sitePage);
    if (!pageUrl) return;
    const pageOrigin = resolveUrlOriginText(pageUrl);
    if (!pageOrigin || (siteOrigin && pageOrigin !== siteOrigin)) return;
    if (seenUrls.indexOf(pageUrl) >= 0) return;
    seenUrls.push(pageUrl);
    urlLines.push('  <url><loc>' + escapeHtmlText(pageUrl) + '</loc></url>');
  });
  return (
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urlLines,
      '</urlset>',
    ].join('\n') + '\n'
  );
};

export default buildSitemapXmlContent;
