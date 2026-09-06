import buildIconPickerGridMarkup from './buildIconPickerGridMarkup.js';

const wireIconPickerEvents = (pickerElement, selectedIconName, handleIconChosen) => {
  const pickerState = { categoryId: 'all', searchQuery: '' };
  const resultsElement = pickerElement.querySelector('[data-db-icon-results]');
  const searchElement = pickerElement.querySelector('[data-db-icon-search]');
  const renderResults = () => {
    resultsElement.innerHTML = buildIconPickerGridMarkup(
      pickerState.categoryId,
      pickerState.searchQuery,
      selectedIconName,
    );
  };
  searchElement.addEventListener('input', () => {
    pickerState.searchQuery = searchElement.value;
    renderResults();
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
    if (iconButton) handleIconChosen(iconButton.getAttribute('data-db-icon-choice'));
  });
  return searchElement;
};

export default wireIconPickerEvents;
