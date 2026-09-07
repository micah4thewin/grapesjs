import resolveAbsoluteSeoUrl from './resolveAbsoluteSeoUrl.js';

const resolveShareImageUrls = (siteSeoRecord, pageSeoRecord) => {
  const canonicalBase = siteSeoRecord.canonicalBase;
  const ogImageUrl = resolveAbsoluteSeoUrl(pageSeoRecord.ogImage || siteSeoRecord.defaultOgImage, canonicalBase);
  const twitterImageUrl = resolveAbsoluteSeoUrl(pageSeoRecord.twitterImage, canonicalBase) || ogImageUrl;
  return { ogImageUrl, twitterImageUrl };
};

export default resolveShareImageUrls;
