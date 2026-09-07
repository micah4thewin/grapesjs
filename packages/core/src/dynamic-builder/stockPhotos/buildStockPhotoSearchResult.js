const buildStockPhotoSearchResult = (photoPayloads, normalizePhotoRecord, resultCount, hasMorePages) => ({
  photos: (Array.isArray(photoPayloads) ? photoPayloads : []).map(normalizePhotoRecord).filter(Boolean),
  totalCount: Number(resultCount) > 0 ? Math.round(Number(resultCount)) : 0,
  hasMore: Boolean(hasMorePages),
});

export default buildStockPhotoSearchResult;
