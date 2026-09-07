import clearTokenUsageHighlight from './clearTokenUsageHighlight.js';
import highlightTokenUsage from './highlightTokenUsage.js';

const wireTokenUsageHighlight = (editor, formElement) => {
  let activeField = null;
  const describeCount = (hitCount) => {
    if (!hitCount) return 'Not used on this page yet';
    return `Used by ${hitCount} element${hitCount === 1 ? '' : 's'} on this page`;
  };
  const showUsage = (targetElement) => {
    const fieldElement = targetElement && targetElement.closest ? targetElement.closest('[data-db-token-field]') : null;
    if (!fieldElement || fieldElement === activeField) return;
    activeField = fieldElement;
    const inputElement = fieldElement.querySelector('[data-db-token-group]');
    const usageElement = fieldElement.querySelector('[data-db-token-usage]');
    if (!inputElement || !usageElement) return;
    const hitCount = highlightTokenUsage(
      editor,
      inputElement.getAttribute('data-db-token-group'),
      inputElement.getAttribute('data-db-token-name'),
      inputElement.value,
    );
    usageElement.hidden = hitCount === null;
    usageElement.textContent = hitCount === null ? '' : describeCount(hitCount);
  };
  const hideUsage = () => {
    if (!activeField) return;
    const usageElement = activeField.querySelector('[data-db-token-usage]');
    if (usageElement) usageElement.hidden = true;
    activeField = null;
    clearTokenUsageHighlight(editor);
  };
  formElement.addEventListener('focusin', (focusEvent) => showUsage(focusEvent.target));
  formElement.addEventListener('mouseover', (mouseEvent) => showUsage(mouseEvent.target));
  formElement.addEventListener('mouseleave', hideUsage);
  formElement.addEventListener('focusout', (focusEvent) => {
    const nextElement = focusEvent.relatedTarget;
    if (!nextElement || !activeField || !activeField.contains(nextElement)) hideUsage();
  });
};

export default wireTokenUsageHighlight;
