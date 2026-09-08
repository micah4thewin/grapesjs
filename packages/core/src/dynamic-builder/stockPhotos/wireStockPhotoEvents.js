import chooseStockPhoto from './chooseStockPhoto.js';
import handleStockPhotoGridKeydown from './handleStockPhotoGridKeydown.js';
import runStockPhotoSearch from './runStockPhotoSearch.js';

const wireStockPhotoEvents = (editor, moduleOptions, modalElement, viewState) => {
  const searchElement = modalElement.querySelector('[data-db-stock-search]');
  const gridElement = modalElement.querySelector('[data-db-stock-grid]');
  const startSearch = (searchQuery, pageNumber) =>
    runStockPhotoSearch(editor, moduleOptions, modalElement, viewState, searchQuery, pageNumber);
  const formElement = modalElement.querySelector('[data-db-stock-form]');
  if (formElement)
    formElement.addEventListener('submit', (submitEvent) => {
      submitEvent.preventDefault();
      startSearch(searchElement ? searchElement.value : '', 1);
    });
  if (gridElement) {
    gridElement.addEventListener('keydown', (keyEvent) => handleStockPhotoGridKeydown(gridElement, keyEvent));
    gridElement.addEventListener(
      'error',
      (errorEvent) => {
        const imageElement = errorEvent.target;
        if (!imageElement || String(imageElement.tagName).toLowerCase() !== 'img') return;
        const cardElement = imageElement.closest ? imageElement.closest('.gjs-db-stock-card') : null;
        if (cardElement) cardElement.setAttribute('data-db-thumb-missing', 'true');
      },
      true,
    );
  }
  modalElement.addEventListener('click', (clickEvent) => {
    const clickTarget = clickEvent.target && clickEvent.target.closest ? clickEvent.target : null;
    if (!clickTarget) return;
    const suggestionElement = clickTarget.closest('[data-db-stock-suggestion]');
    if (suggestionElement) {
      const suggestionText = suggestionElement.getAttribute('data-db-stock-suggestion');
      if (searchElement) searchElement.value = suggestionText;
      startSearch(suggestionText, 1);
      return;
    }
    if (clickTarget.closest('[data-db-stock-more]')) {
      startSearch(viewState.query, viewState.page + 1);
      return;
    }
    const choiceElement = clickTarget.closest('[data-db-stock-choose]');
    if (!choiceElement) return;
    const photoRecord = viewState.photos[Number(choiceElement.getAttribute('data-db-stock-choose'))];
    if (!photoRecord) return;
    editor.Modal.close();
    chooseStockPhoto(editor, moduleOptions, photoRecord);
  });
};

export default wireStockPhotoEvents;
