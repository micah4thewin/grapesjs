import buildStockPhotoEmptyMarkup from './buildStockPhotoEmptyMarkup.js';
import buildStockPhotoGridMarkup from './buildStockPhotoGridMarkup.js';
import describeStockPhotoState from './describeStockPhotoState.js';

const renderStockPhotoResults = (modalElement, viewState, moduleOptions) => {
  if (!modalElement) return;
  const stateRecord = describeStockPhotoState(viewState, moduleOptions);
  const gridElement = modalElement.querySelector('[data-db-stock-grid]');
  const statusElement = modalElement.querySelector('[data-db-stock-status]');
  const moreElement = modalElement.querySelector('[data-db-stock-more]');
  if (gridElement)
    gridElement.innerHTML = viewState.photos.length
      ? buildStockPhotoGridMarkup(viewState.photos)
      : buildStockPhotoEmptyMarkup(stateRecord.emptyText);
  if (statusElement) statusElement.textContent = stateRecord.statusText;
  if (moreElement) moreElement.hidden = !viewState.hasMore || viewState.loading;
};

export default renderStockPhotoResults;
