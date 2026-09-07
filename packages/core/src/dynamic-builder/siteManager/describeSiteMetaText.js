import formatRelativeTimeText from '../persistence/formatRelativeTimeText.js';

const describeSiteMetaText = (siteRecord, nowValue) => {
  const pageCount = Number.isFinite(siteRecord.pageCount) ? siteRecord.pageCount : 1;
  const pagesText = pageCount + (pageCount === 1 ? ' page' : ' pages');
  const updatedText = formatRelativeTimeText(siteRecord.updatedAt, nowValue);
  return updatedText ? pagesText + ' \u00b7 last edited ' + updatedText : pagesText;
};

export default describeSiteMetaText;
