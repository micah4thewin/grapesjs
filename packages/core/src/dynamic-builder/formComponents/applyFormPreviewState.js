const clearPreviewState = (formElement) => {
  formElement.querySelectorAll('[data-db-preview-error]').forEach((errorElement) => errorElement.remove());
  formElement.querySelectorAll('.db-field-invalid').forEach((controlElement) => {
    controlElement.classList.remove('db-field-invalid');
    controlElement.removeAttribute('aria-invalid');
  });
  formElement.classList.remove('db-form-sent');
  const statusElement = formElement.querySelector('[data-db-form-status]');
  if (statusElement) {
    statusElement.textContent = '';
    statusElement.className = 'db-form-status';
  }
  const buttonElement = formElement.querySelector('button[type=submit]');
  if (buttonElement && buttonElement.dataset.dbPreviewLabel) {
    buttonElement.innerHTML = buttonElement.dataset.dbPreviewLabel;
    delete buttonElement.dataset.dbPreviewLabel;
    buttonElement.removeAttribute('aria-busy');
    buttonElement.disabled = false;
  }
};

const setPreviewStatus = (formElement, messageText, statusKind) => {
  const statusElement = formElement.querySelector('[data-db-form-status]');
  if (!statusElement) return;
  statusElement.textContent = messageText;
  statusElement.className = 'db-form-status db-form-status-' + statusKind;
};

const applyFormPreviewState = (formComponent, stateId) => {
  const formElement = formComponent && formComponent.getEl ? formComponent.getEl() : null;
  if (!formElement) return;
  clearPreviewState(formElement);
  const readText = (attributeName, fallbackText) => formElement.getAttribute(attributeName) || fallbackText;
  if (stateId === 'errors') {
    [...formElement.querySelectorAll('.db-field-control')].slice(0, 2).forEach((controlElement) => {
      controlElement.classList.add('db-field-invalid');
      controlElement.setAttribute('aria-invalid', 'true');
      const errorElement = formElement.ownerDocument.createElement('small');
      errorElement.className = 'db-field-error';
      errorElement.setAttribute('data-db-preview-error', 'true');
      errorElement.textContent = 'Please fill in this field.';
      controlElement.insertAdjacentElement('afterend', errorElement);
    });
    setPreviewStatus(formElement, readText('data-db-error-message', 'Please fix the errors above.'), 'error');
  }
  if (stateId === 'sending') {
    const buttonElement = formElement.querySelector('button[type=submit]');
    if (!buttonElement) return;
    buttonElement.dataset.dbPreviewLabel = buttonElement.innerHTML;
    buttonElement.textContent = buttonElement.getAttribute('data-db-sending-label') || 'Sending...';
    buttonElement.setAttribute('aria-busy', 'true');
    buttonElement.disabled = true;
  }
  if (stateId === 'success') {
    setPreviewStatus(
      formElement,
      readText('data-db-success-message', 'Thanks! Your message has been received.'),
      'success',
    );
    if (formElement.getAttribute('data-db-hide-on-success') === 'true') formElement.classList.add('db-form-sent');
  }
  if (stateId === 'failure')
    setPreviewStatus(
      formElement,
      readText('data-db-failure-message', 'Sorry, your message could not be sent.'),
      'error',
    );
  if (stateId === 'not-connected')
    setPreviewStatus(formElement, 'This form is not connected yet, so nothing was sent.', 'error');
};

export default applyFormPreviewState;
