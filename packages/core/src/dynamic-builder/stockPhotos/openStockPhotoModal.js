import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildStockPhotoModalMarkup from './buildStockPhotoModalMarkup.js';
import isEditorLive from '../support/isEditorLive.js';
import openThemedModal from '../support/openThemedModal.js';
import renderStockPhotoResults from './renderStockPhotoResults.js';
import wireStockPhotoEvents from './wireStockPhotoEvents.js';

const openStockPhotoModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  const modalElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    buildStockPhotoModalMarkup(moduleOptions),
  );
  if (!modalElement) return null;
  const viewState = { query: '', page: 1, photos: [], totalCount: 0, hasMore: false, loading: false, errorText: '' };
  wireStockPhotoEvents(editor, moduleOptions, modalElement, viewState);
  renderStockPhotoResults(modalElement, viewState, moduleOptions);
  openThemedModal(editor, 'Free photos', modalElement, { className: 'gjs-db-stock-modal' });
  setTimeout(() => {
    if (!isEditorLive(editor)) return;
    const searchElement = modalElement.querySelector('[data-db-stock-search]');
    if (searchElement && searchElement.focus) searchElement.focus();
  }, 60);
  return modalElement;
};

export default openStockPhotoModal;
