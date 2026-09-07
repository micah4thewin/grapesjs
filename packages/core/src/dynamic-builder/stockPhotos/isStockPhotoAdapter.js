const isStockPhotoAdapter = (adapterCandidate) =>
  Boolean(adapterCandidate) &&
  typeof adapterCandidate.searchPhotos === 'function' &&
  typeof adapterCandidate.describeProvider === 'function';

export default isStockPhotoAdapter;
