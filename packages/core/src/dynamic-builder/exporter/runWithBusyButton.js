const runWithBusyButton = (buttonElement, runAction, busyLabel) => {
  if (!buttonElement || typeof buttonElement.setAttribute !== 'function') {
    runAction();
    return true;
  }
  if (buttonElement.getAttribute('aria-busy') === 'true') return false;
  const originalText = buttonElement.textContent;
  buttonElement.setAttribute('aria-busy', 'true');
  buttonElement.disabled = true;
  buttonElement.textContent = busyLabel || 'Preparing\u2026';
  const restoreButton = () => {
    buttonElement.removeAttribute('aria-busy');
    buttonElement.disabled = false;
    buttonElement.textContent = originalText;
  };
  setTimeout(() => {
    try {
      runAction();
    } finally {
      restoreButton();
    }
  }, 0);
  return true;
};

export default runWithBusyButton;
