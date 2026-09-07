import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSitemapUrlEntryMarkup = (pageUrl, lastModifiedText) =>
  [
    '  <url><loc>' + escapeHtmlText(pageUrl) + '</loc>',
    lastModifiedText ? '<lastmod>' + escapeHtmlText(lastModifiedText) + '</lastmod>' : '',
    '</url>',
  ].join('');

export default buildSitemapUrlEntryMarkup;
