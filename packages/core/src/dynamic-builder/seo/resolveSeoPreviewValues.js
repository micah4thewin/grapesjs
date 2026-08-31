import joinCanonicalBaseWithSlug from './joinCanonicalBaseWithSlug.js';
import resolveSeoTitleText from './resolveSeoTitleText.js';
import resolveTargetPage from './resolveTargetPage.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import toSlugText from '../support/toSlugText.js';

const resolveSeoPreviewValues = (editor, siteValues, pageValues) => {
  const selectedPage = resolveTargetPage(editor, null);
  const pageName = selectedPage && selectedPage.getName ? selectedPage.getName() : '';
  const titleText = resolveSeoTitleText(siteValues, pageValues, pageName);
  const descriptionText = String(pageValues.description || siteValues.defaultDescription || '').trim();
  const slugText = pageValues.slug ? toSlugText(pageValues.slug) : toSlugText(pageName);
  const canonicalOverride = sanitizeUrlValue(pageValues.canonical || '');
  const builtUrl = joinCanonicalBaseWithSlug(siteValues.canonicalBase, slugText);
  const urlText = canonicalOverride || builtUrl || 'Set the canonical base URL under Site defaults';
  const socialTitleText = String(pageValues.ogTitle || titleText).trim();
  const socialDescriptionText = String(pageValues.ogDescription || descriptionText).trim();
  const socialImageUrl = sanitizeUrlValue(pageValues.ogImage || pageValues.twitterImage || '');
  return { titleText, descriptionText, urlText, socialTitleText, socialDescriptionText, socialImageUrl };
};

export default resolveSeoPreviewValues;
