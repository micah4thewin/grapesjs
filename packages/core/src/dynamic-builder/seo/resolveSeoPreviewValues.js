import describeShareImageProblem from './describeShareImageProblem.js';
import joinCanonicalBaseWithSlug from './joinCanonicalBaseWithSlug.js';
import resolveAbsoluteSeoUrl from './resolveAbsoluteSeoUrl.js';
import resolvePendingPagePath from './resolvePendingPagePath.js';
import resolveSeoBaseTitleText from './resolveSeoBaseTitleText.js';
import resolveSeoDescriptionText from './resolveSeoDescriptionText.js';
import resolveSeoPageContext from './resolveSeoPageContext.js';
import resolveSeoTitleText from './resolveSeoTitleText.js';
import resolveShareImageUrls from './resolveShareImageUrls.js';
import resolveUrlHostText from './resolveUrlHostText.js';

const resolveSeoPreviewValues = (editor, siteValues, pageValues, page) => {
  const pageContext = resolveSeoPageContext(editor, page);
  const titleText = resolveSeoTitleText(siteValues, pageValues, pageContext.pageName);
  const baseTitleText = resolveSeoBaseTitleText(siteValues, pageValues, pageContext.pageName);
  const descriptionText = resolveSeoDescriptionText(siteValues, pageValues);
  const canonicalOverride = resolveAbsoluteSeoUrl(pageValues.canonical, siteValues.canonicalBase);
  const pendingPath = resolvePendingPagePath(editor, pageContext.page, pageValues.slug);
  const urlText = canonicalOverride || joinCanonicalBaseWithSlug(siteValues.canonicalBase, pendingPath);
  const socialTitleText = String(pageValues.ogTitle || baseTitleText).trim();
  const socialDescriptionText = String(pageValues.ogDescription || descriptionText).trim();
  const shareImages = resolveShareImageUrls(siteValues, pageValues);
  const ogImageSource = pageValues.ogImage || siteValues.defaultOgImage;
  return {
    titleText,
    descriptionText,
    urlText,
    domainText: resolveUrlHostText(urlText),
    siteNameText: String(siteValues.ogSiteName || siteValues.siteName || '').trim(),
    socialTitleText,
    socialDescriptionText,
    socialImageUrl: shareImages.ogImageUrl,
    socialImageNote: describeShareImageProblem(ogImageSource, siteValues.canonicalBase),
    twitterTitleText: String(pageValues.twitterTitle || socialTitleText).trim(),
    twitterDescriptionText: String(pageValues.twitterDescription || socialDescriptionText).trim(),
    twitterImageUrl: shareImages.twitterImageUrl,
    twitterImageNote: describeShareImageProblem(pageValues.twitterImage || ogImageSource, siteValues.canonicalBase),
  };
};

export default resolveSeoPreviewValues;
