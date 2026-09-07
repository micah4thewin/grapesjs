const movePageRowFocus = (rowElement, currentElement, stepDirection) => {
  const rowButtons = [...rowElement.querySelectorAll('[role="menuitem"]')];
  const currentIndex = rowButtons.indexOf(currentElement);
  if (currentIndex < 0 || !rowButtons.length) return false;
  const nextIndex = (currentIndex + stepDirection + rowButtons.length) % rowButtons.length;
  rowButtons[nextIndex].focus();
  return true;
};

export default movePageRowFocus;
