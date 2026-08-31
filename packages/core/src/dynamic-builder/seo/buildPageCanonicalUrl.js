import getPageSeoRecord from './getPageSeoRecord.js';
import getSiteSeoRecord from './getSiteSeoRecord.js';
import joinCanonicalBaseWithSlug from './joinCanonicalBaseWithSlug.js';
import resolvePageSlugText from './resolvePageSlugText.js';
import resolveTargetPage from './resolveTargetPage.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const buildPageCanonicalUrl = (editor, page) => {
  const targetPage = resolveTargetPage(editor, page);
  const pageSeoRecord = getPageSeoRecord(editor, targetPage);
  const canonicalOverride = sanitizeUrlValue(pageSeoRecord.canonical);
  if (canonicalOverride) return canonicalOverride;
  const siteSeoRecord = getSiteSeoRecord(editor);
  return joinCanonicalBaseWithSlug(siteSeoRecord.canonicalBase, resolvePageSlugText(editor, targetPage));
};

export default buildPageCanonicalUrl;
