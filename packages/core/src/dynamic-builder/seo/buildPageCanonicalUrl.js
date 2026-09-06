import getPageSeoRecord from './getPageSeoRecord.js';
import getSiteSeoRecord from './getSiteSeoRecord.js';
import joinCanonicalBaseWithSlug from './joinCanonicalBaseWithSlug.js';
import resolveAbsoluteSeoUrl from './resolveAbsoluteSeoUrl.js';
import resolvePageSlugText from './resolvePageSlugText.js';
import resolveTargetPage from './resolveTargetPage.js';

const buildPageCanonicalUrl = (editor, page) => {
  const targetPage = resolveTargetPage(editor, page);
  const pageSeoRecord = getPageSeoRecord(editor, targetPage);
  const siteSeoRecord = getSiteSeoRecord(editor);
  const canonicalOverride = resolveAbsoluteSeoUrl(pageSeoRecord.canonical, siteSeoRecord.canonicalBase);
  if (canonicalOverride) return canonicalOverride;
  return joinCanonicalBaseWithSlug(siteSeoRecord.canonicalBase, resolvePageSlugText(editor, targetPage));
};

export default buildPageCanonicalUrl;
