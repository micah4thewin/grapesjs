import clearDesignKitPreview from './clearDesignKitPreview.js';
import previewDesignKitOnCanvas from './previewDesignKitOnCanvas.js';

const wireDesignKitCardPreview = (editor, moduleOptions, gridsElement, previewContext) => {
  const findCard = (targetElement) =>
    targetElement && targetElement.closest ? targetElement.closest('[data-db-kit-id]') : null;
  const previewCard = (cardElement) => {
    if (!cardElement) return;
    const kitId = cardElement.getAttribute('data-db-kit-id');
    if (kitId === previewContext.readActiveKitId()) {
      clearDesignKitPreview(editor);
      return;
    }
    previewDesignKitOnCanvas(editor, moduleOptions, previewContext.findKitRecord(kitId));
  };
  gridsElement.addEventListener('mouseover', (mouseEvent) => previewCard(findCard(mouseEvent.target)));
  gridsElement.addEventListener('focusin', (focusEvent) => previewCard(findCard(focusEvent.target)));
  gridsElement.addEventListener('mouseleave', () => clearDesignKitPreview(editor));
  gridsElement.addEventListener('focusout', (focusEvent) => {
    const nextElement = focusEvent.relatedTarget;
    if (!nextElement || !gridsElement.contains(nextElement)) clearDesignKitPreview(editor);
  });
  gridsElement.addEventListener('keydown', (keyEvent) => {
    const cardElements = Array.from(gridsElement.querySelectorAll('[data-db-kit-id]'));
    const currentIndex = cardElements.indexOf(keyEvent.target);
    const stepMap = { ArrowRight: 1, ArrowDown: 2, ArrowLeft: -1, ArrowUp: -2 };
    if (currentIndex < 0 || !stepMap[keyEvent.key]) return;
    keyEvent.preventDefault();
    const nextIndex = Math.max(0, Math.min(cardElements.length - 1, currentIndex + stepMap[keyEvent.key]));
    cardElements[nextIndex].focus();
  });
};

export default wireDesignKitCardPreview;
