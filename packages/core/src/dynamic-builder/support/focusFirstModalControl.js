const focusFirstModalControl = (rootElement, delayMs = 50) => {
  if (!rootElement || typeof rootElement.querySelector !== 'function') return;
  const controlSelector =
    '[data-db-autofocus], input:not([type="hidden"]):not([disabled]), select:not([disabled]),' +
    ' textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';
  setTimeout(() => {
    const preferredControl = rootElement.querySelector('[data-db-autofocus]');
    const targetControl = preferredControl || rootElement.querySelector(controlSelector);
    if (targetControl && typeof targetControl.focus === 'function') targetControl.focus();
  }, delayMs);
};

export default focusFirstModalControl;
