const filterFieldPickerList = (rootElement, queryText) => {
  const loweredQuery = String(queryText || '')
    .trim()
    .toLowerCase();
  let visibleCount = 0;
  Array.from(rootElement.querySelectorAll('[data-db-pick-token]')).forEach((pickButton) => {
    const haystack = pickButton.textContent.toLowerCase();
    const isVisible = !loweredQuery || haystack.indexOf(loweredQuery) >= 0;
    pickButton.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });
  Array.from(rootElement.querySelectorAll('[data-db-pick-group]')).forEach((groupElement) => {
    groupElement.hidden = !groupElement.querySelector('[data-db-pick-token]:not([hidden])');
  });
  const emptyElement = rootElement.querySelector('[data-db-pick-empty]');
  if (emptyElement) emptyElement.hidden = visibleCount > 0;
};

export default filterFieldPickerList;
