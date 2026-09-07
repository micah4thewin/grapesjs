import normalizeTwitterHandle from './normalizeTwitterHandle.js';

const collectTwitterMetaEntries = (siteSeoRecord, pageSeoRecord, resolvedValues) => {
  const shareImageUrl = String(resolvedValues.twitterImageUrl || '');
  const cardStyle = pageSeoRecord.twitterCard || (shareImageUrl ? 'summary_large_image' : 'summary');
  const fallbackTitle = pageSeoRecord.ogTitle || resolvedValues.socialTitleText || resolvedValues.titleText;
  return [
    ['twitter:card', cardStyle],
    ['twitter:title', pageSeoRecord.twitterTitle || fallbackTitle],
    [
      'twitter:description',
      pageSeoRecord.twitterDescription || pageSeoRecord.ogDescription || resolvedValues.descriptionText,
    ],
    ['twitter:image', shareImageUrl],
    ['twitter:site', normalizeTwitterHandle(siteSeoRecord.twitterHandle)],
  ].filter((metaEntry) => String(metaEntry[1] || '').trim());
};

export default collectTwitterMetaEntries;
