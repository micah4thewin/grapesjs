import buildFindingItemMarkup from './buildFindingItemMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildFindingListMarkup = (findings) => {
  const findingList = Array.isArray(findings) ? findings : [];
  const pageNames = [];
  findingList.forEach((findingRecord) => {
    const pageName = String(findingRecord.pageName || '');
    if (!pageNames.includes(pageName)) pageNames.push(pageName);
  });
  const buildListMarkup = (listFindings) =>
    '<ul class="gjs-db-list">' +
    listFindings.map((findingRecord) => buildFindingItemMarkup(findingRecord)).join('') +
    '</ul>';
  if (pageNames.length < 2) return buildListMarkup(findingList);
  return pageNames
    .map(
      (pageName) =>
        '<div class="gjs-db-audit-page-head">' +
        escapeHtmlText(pageName || 'Site-wide') +
        '</div>' +
        buildListMarkup(findingList.filter((findingRecord) => String(findingRecord.pageName || '') === pageName)),
    )
    .join('');
};

export default buildFindingListMarkup;
