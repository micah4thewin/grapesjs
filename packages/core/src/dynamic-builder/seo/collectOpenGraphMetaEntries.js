const collectOpenGraphMetaEntries = (siteSeoRecord, pageSeoRecord, resolvedValues) =>
  [
    ['og:title', pageSeoRecord.ogTitle || resolvedValues.socialTitleText || resolvedValues.titleText],
    ['og:description', pageSeoRecord.ogDescription || resolvedValues.descriptionText],
    ['og:type', pageSeoRecord.ogType || 'website'],
    ['og:url', resolvedValues.canonicalUrl],
    ['og:image', resolvedValues.ogImageUrl],
    ['og:site_name', siteSeoRecord.ogSiteName || siteSeoRecord.siteName || ''],
  ].filter((metaEntry) => String(metaEntry[1] || '').trim());

export default collectOpenGraphMetaEntries;
