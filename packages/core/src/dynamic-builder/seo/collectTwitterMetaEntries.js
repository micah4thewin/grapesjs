import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const collectTwitterMetaEntries = (siteSeoRecord, pageSeoRecord, resolvedValues) => {
  const shareImageUrl = sanitizeUrlValue(pageSeoRecord.twitterImage || pageSeoRecord.ogImage);
  const cardStyle = pageSeoRecord.twitterCard || (shareImageUrl ? 'summary_large_image' : 'summary');
  const rawHandle = String(siteSeoRecord.twitterHandle || '').trim();
  const siteHandle = rawHandle && !rawHandle.startsWith('@') ? '@' + rawHandle : rawHandle;
  return [
    ['twitter:card', cardStyle],
    ['twitter:title', pageSeoRecord.twitterTitle || pageSeoRecord.ogTitle || resolvedValues.titleText],
    [
      'twitter:description',
      pageSeoRecord.twitterDescription || pageSeoRecord.ogDescription || resolvedValues.descriptionText,
    ],
    ['twitter:image', shareImageUrl],
    ['twitter:site', siteHandle],
  ].filter((metaEntry) => String(metaEntry[1] || '').trim());
};

export default collectTwitterMetaEntries;
