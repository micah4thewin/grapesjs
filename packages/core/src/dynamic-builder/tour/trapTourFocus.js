import listFocusableElements from '../support/listFocusableElements.js';

const trapTourFocus = (popoverElement, keyEvent) => {
  const focusableElements = listFocusableElements(popoverElement).filter(
    (candidateElement) => !candidateElement.hidden,
  );
  if (!focusableElements.length) return false;
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const activeElement = popoverElement.ownerDocument.activeElement;
  const isOutside = !popoverElement.contains(activeElement);
  if (keyEvent.shiftKey && (isOutside || activeElement === firstElement)) {
    keyEvent.preventDefault();
    lastElement.focus();
    return true;
  }
  if (!keyEvent.shiftKey && (isOutside || activeElement === lastElement)) {
    keyEvent.preventDefault();
    firstElement.focus();
    return true;
  }
  return false;
};

export default trapTourFocus;
