import buildPageCanonicalUrl from './buildPageCanonicalUrl.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSitemapXmlContent = (editor) => {
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  const urlLines = pageList
    .map((sitePage) => buildPageCanonicalUrl(editor, sitePage))
    .filter(Boolean)
    .map((pageUrl) => '  <url><loc>' + escapeHtmlText(pageUrl) + '</loc></url>');
  const documentLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlLines,
    '</urlset>',
  ];
  return documentLines.join('\n') + '\n';
};

export default buildSitemapXmlContent;
