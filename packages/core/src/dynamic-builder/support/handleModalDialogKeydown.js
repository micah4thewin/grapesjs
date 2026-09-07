import listFocusableElements from './listFocusableElements.js';

const handleModalDialogKeydown = (editor, dialogElement, keyEvent) => {
  if (keyEvent.defaultPrevented || keyEvent.isComposing) return;
  if (keyEvent.key === 'Escape' || keyEvent.key === 'Esc') {
    keyEvent.preventDefault();
    keyEvent.stopPropagation();
    editor.Modal.close();
    return;
  }
  if (keyEvent.key !== 'Tab') return;
  const focusableElements = listFocusableElements(dialogElement);
  if (!focusableElements.length) {
    keyEvent.preventDefault();
    dialogElement.focus();
    return;
  }
  const activeIndex = focusableElements.indexOf(dialogElement.ownerDocument.activeElement);
  const lastIndex = focusableElements.length - 1;
  if (keyEvent.shiftKey && activeIndex <= 0) {
    keyEvent.preventDefault();
    focusableElements[lastIndex].focus();
  } else if (!keyEvent.shiftKey && (activeIndex < 0 || activeIndex === lastIndex)) {
    keyEvent.preventDefault();
    focusableElements[0].focus();
  }
};

export default handleModalDialogKeydown;
