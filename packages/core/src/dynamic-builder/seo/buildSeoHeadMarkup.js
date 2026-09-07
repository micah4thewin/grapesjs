import buildDefaultFaviconLinkMarkup from './buildDefaultFaviconLinkMarkup.js';
import buildHeadLinkTagMarkup from './buildHeadLinkTagMarkup.js';
import buildHeadMetaTagMarkup from './buildHeadMetaTagMarkup.js';
import buildPageCanonicalUrl from './buildPageCanonicalUrl.js';
import buildRobotsMetaContent from './buildRobotsMetaContent.js';
import collectOpenGraphMetaEntries from './collectOpenGraphMetaEntries.js';
import collectTwitterMetaEntries from './collectTwitterMetaEntries.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getPageSeoRecord from './getPageSeoRecord.js';
import getSiteSeoRecord from './getSiteSeoRecord.js';
import resolveOpenGraphLocale from './resolveOpenGraphLocale.js';
import resolveSeoBaseTitleText from './resolveSeoBaseTitleText.js';
import resolveSeoDescriptionText from './resolveSeoDescriptionText.js';
import resolveSeoTitleText from './resolveSeoTitleText.js';
import resolveShareImageUrls from './resolveShareImageUrls.js';
import resolveTargetPage from './resolveTargetPage.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const buildSeoHeadMarkup = (editor, page) => {
  const targetPage = resolveTargetPage(editor, page);
  const siteSeoRecord = getSiteSeoRecord(editor);
  const pageSeoRecord = getPageSeoRecord(editor, targetPage);
  const pageName = targetPage && targetPage.getName ? targetPage.getName() : '';
  const titleText = resolveSeoTitleText(siteSeoRecord, pageSeoRecord, pageName);
  const socialTitleText = resolveSeoBaseTitleText(siteSeoRecord, pageSeoRecord, pageName);
  const descriptionText = resolveSeoDescriptionText(siteSeoRecord, pageSeoRecord);
  const canonicalUrl = buildPageCanonicalUrl(editor, targetPage);
  const faviconUrl = sanitizeUrlValue(siteSeoRecord.favicon);
  const headTagList = ['<title>' + escapeHtmlText(titleText) + '</title>'];
  headTagList.push(buildHeadMetaTagMarkup('name', 'description', descriptionText));
  headTagList.push(buildHeadMetaTagMarkup('name', 'robots', buildRobotsMetaContent(pageSeoRecord)));
  headTagList.push(buildHeadLinkTagMarkup('canonical', canonicalUrl));
  headTagList.push(faviconUrl ? buildHeadLinkTagMarkup('icon', faviconUrl) : buildDefaultFaviconLinkMarkup(editor));
  headTagList.push(buildHeadMetaTagMarkup('property', 'og:locale', resolveOpenGraphLocale(siteSeoRecord.language)));
  const resolvedValues = {
    titleText,
    socialTitleText,
    descriptionText,
    canonicalUrl,
    ...resolveShareImageUrls(siteSeoRecord, pageSeoRecord),
  };
  collectOpenGraphMetaEntries(siteSeoRecord, pageSeoRecord, resolvedValues).forEach((metaEntry) =>
    headTagList.push(buildHeadMetaTagMarkup('property', metaEntry[0], metaEntry[1])),
  );
  collectTwitterMetaEntries(siteSeoRecord, pageSeoRecord, resolvedValues).forEach((metaEntry) =>
    headTagList.push(buildHeadMetaTagMarkup('name', metaEntry[0], metaEntry[1])),
  );
  return headTagList.filter(Boolean).join('\n');
};

export default buildSeoHeadMarkup;
