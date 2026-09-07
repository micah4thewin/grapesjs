const describeStockPhotoState = (viewState, moduleOptions) => {
  if (!moduleOptions || !moduleOptions.adapter)
    return {
      statusText: 'No picture service is connected',
      emptyText: (moduleOptions && moduleOptions.missingProviderNotice) || 'No picture service is connected yet.',
    };
  if (viewState.loading) return { statusText: 'Searching for photos...', emptyText: 'Looking for photos...' };
  if (viewState.errorText) return { statusText: viewState.errorText, emptyText: viewState.errorText };
  if (viewState.photos.length) {
    const totalText = viewState.totalCount > viewState.photos.length ? ' of ' + viewState.totalCount : '';
    return {
      statusText: 'Showing ' + viewState.photos.length + totalText + ' photos for ' + viewState.query,
      emptyText: '',
    };
  }
  if (viewState.query)
    return {
      statusText: 'No photos matched ' + viewState.query,
      emptyText: 'No photos matched ' + viewState.query + '. Try a simpler word, such as beach or desk.',
    };
  return {
    statusText: 'Search to see free photos',
    emptyText: 'Search above, or pick one of the ideas, to see free photos you can use on this site.',
  };
};

export default describeStockPhotoState;
