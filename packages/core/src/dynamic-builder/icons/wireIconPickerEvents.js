import applyIconGridTabindex from './applyIconGridTabindex.js';
import buildIconPickerGridMarkup from './buildIconPickerGridMarkup.js';
import moveIconGridFocus from './moveIconGridFocus.js';
import rememberRecentIconName from './rememberRecentIconName.js';

const wireIconPickerEvents = (pickerElement, selectedIconName, handleIconChosen, handlePickerDismissed) => {
  const pickerState = { categoryId: 'all', searchQuery: '' };
  const resultsElement = pickerElement.querySelector('[data-db-icon-results]');
  const searchElement = pickerElement.querySelector('[data-db-icon-search]');
  const renderResults = () => {
    resultsElement.innerHTML = buildIconPickerGridMarkup(
      pickerState.categoryId,
      pickerState.searchQuery,
      selectedIconName,
    );
    applyIconGridTabindex(resultsElement);
  };
  const chooseIcon = (iconName) => {
    rememberRecentIconName(iconName);
    handleIconChosen(iconName);
  };
  const readFirstCell = () =>
    resultsElement.querySelector('[data-db-icon-choice][tabindex="0"]') ||
    resultsElement.querySelector('[data-db-icon-choice]');
  searchElement.addEventListener('input', () => {
    pickerState.searchQuery = searchElement.value;
    renderResults();
  });
  searchElement.addEventListener('keydown', (keyEvent) => {
    if (keyEvent.key !== 'ArrowDown' && keyEvent.key !== 'Enter') return;
    const firstCell = readFirstCell();
    if (!firstCell) return;
    keyEvent.preventDefault();
    if (keyEvent.key === 'Enter' && pickerState.searchQuery.trim())
      chooseIcon(firstCell.getAttribute('data-db-icon-choice'));
    else firstCell.focus();
  });
  resultsElement.addEventListener('keydown', (keyEvent) => {
    const currentCell =
      keyEvent.target && keyEvent.target.closest ? keyEvent.target.closest('[data-db-icon-choice]') : null;
    const nextCell = currentCell ? moveIconGridFocus(resultsElement, currentCell, keyEvent.key) : null;
    if (!nextCell) return;
    keyEvent.preventDefault();
    currentCell.setAttribute('tabindex', '-1');
    nextCell.setAttribute('tabindex', '0');
    nextCell.focus();
  });
  pickerElement.addEventListener('keydown', (keyEvent) => {
    if (keyEvent.key !== 'Escape' || typeof handlePickerDismissed !== 'function') return;
    keyEvent.preventDefault();
    keyEvent.stopPropagation();
    handlePickerDismissed();
  });
  pickerElement.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target && clickEvent.target.closest ? clickEvent.target : null;
    const categoryButton = targetElement && targetElement.closest('[data-db-icon-category]');
    if (categoryButton) {
      pickerState.categoryId = categoryButton.getAttribute('data-db-icon-category');
      pickerElement
        .querySelectorAll('[data-db-icon-category]')
        .forEach((chipElement) => chipElement.classList.toggle('gjs-db-chip-active', chipElement === categoryButton));
      renderResults();
      return;
    }
    const iconButton = targetElement && targetElement.closest('[data-db-icon-choice]');
    if (iconButton) chooseIcon(iconButton.getAttribute('data-db-icon-choice'));
  });
  applyIconGridTabindex(resultsElement);
  return searchElement;
};

export default wireIconPickerEvents;
