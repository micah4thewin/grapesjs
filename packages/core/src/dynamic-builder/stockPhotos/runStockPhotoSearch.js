import isEditorLive from '../support/isEditorLive.js';
import renderStockPhotoResults from './renderStockPhotoResults.js';

const startSearchState = (viewState, searchQuery, pageNumber) => {
  viewState.query = searchQuery;
  viewState.page = pageNumber > 1 ? pageNumber : 1;
  viewState.loading = true;
  viewState.errorText = '';
  if (viewState.page === 1) {
    viewState.photos = [];
    viewState.hasMore = false;
    viewState.totalCount = 0;
  }
};

const runStockPhotoSearch = (editor, moduleOptions, modalElement, viewState, searchQuery, pageNumber) => {
  const trimmedQuery = String(searchQuery || '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!moduleOptions.adapter || !trimmedQuery || viewState.loading) return Promise.resolve(viewState);
  startSearchState(viewState, trimmedQuery, Number(pageNumber) || 1);
  renderStockPhotoResults(modalElement, viewState, moduleOptions);
  return moduleOptions.adapter
    .searchPhotos(trimmedQuery, viewState.page)
    .then((searchResult) => {
      const foundPhotos = (searchResult && searchResult.photos) || [];
      viewState.photos = viewState.page > 1 ? viewState.photos.concat(foundPhotos) : foundPhotos;
      viewState.hasMore = Boolean(searchResult && searchResult.hasMore);
      viewState.totalCount = Number(searchResult && searchResult.totalCount) || viewState.photos.length;
    })
    .catch((searchError) => {
      viewState.errorText =
        (searchError && searchError.message) || 'The photo search did not work. Try again in a moment.';
    })
    .then(() => {
      viewState.loading = false;
      if (isEditorLive(editor)) renderStockPhotoResults(modalElement, viewState, moduleOptions);
      return viewState;
    });
};

export default runStockPhotoSearch;
