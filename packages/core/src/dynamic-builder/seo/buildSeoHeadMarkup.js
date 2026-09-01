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
import resolveSeoTitleText from './resolveSeoTitleText.js';
import resolveTargetPage from './resolveTargetPage.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const buildSeoHeadMarkup = (editor, page) => {
  const targetPage = resolveTargetPage(editor, page);
  const siteSeoRecord = getSiteSeoRecord(editor);
  const pageSeoRecord = getPageSeoRecord(editor, targetPage);
  const pageName = targetPage && targetPage.getName ? targetPage.getName() : '';
  const titleText = resolveSeoTitleText(siteSeoRecord, pageSeoRecord, pageName);
  const descriptionText = String(pageSeoRecord.description || siteSeoRecord.defaultDescription || '').trim();
  const canonicalUrl = buildPageCanonicalUrl(editor, targetPage);
  const robotsContent = buildRobotsMetaContent(pageSeoRecord);
  const faviconUrl = sanitizeUrlValue(siteSeoRecord.favicon);
  const languageCode = String(siteSeoRecord.language || '').trim();
  const headTagList = ['<title>' + escapeHtmlText(titleText) + '</title>'];
  headTagList.push(buildHeadMetaTagMarkup('name', 'description', descriptionText));
  headTagList.push(buildHeadMetaTagMarkup('name', 'robots', robotsContent));
  headTagList.push(buildHeadLinkTagMarkup('canonical', canonicalUrl));
  headTagList.push(faviconUrl ? buildHeadLinkTagMarkup('icon', faviconUrl) : buildDefaultFaviconLinkMarkup());
  if (languageCode) headTagList.push('<meta data-db-language="' + escapeHtmlText(languageCode) + '">');
  const resolvedValues = { titleText, descriptionText, canonicalUrl };
  collectOpenGraphMetaEntries(siteSeoRecord, pageSeoRecord, resolvedValues).forEach((metaEntry) =>
    headTagList.push(buildHeadMetaTagMarkup('property', metaEntry[0], metaEntry[1])),
  );
  collectTwitterMetaEntries(siteSeoRecord, pageSeoRecord, resolvedValues).forEach((metaEntry) =>
    headTagList.push(buildHeadMetaTagMarkup('name', metaEntry[0], metaEntry[1])),
  );
  return headTagList.filter(Boolean).join('\n');
};

export default buildSeoHeadMarkup;
