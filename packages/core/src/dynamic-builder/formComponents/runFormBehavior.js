const runFormBehavior = () => {
  document.querySelectorAll('form[data-db-form]').forEach((formElement) => {
    if (formElement.dataset.dbFormReady) return;
    formElement.dataset.dbFormReady = 'true';
    const statusElement = formElement.querySelector('[data-db-form-status]');
    const setStatusMessage = (messageText, statusKind) => {
      if (!statusElement) return;
      statusElement.textContent = messageText;
      statusElement.className = 'db-form-status' + (statusKind ? ' db-form-status-' + statusKind : '');
    };
    const listControls = () =>
      [...formElement.querySelectorAll('input, select, textarea')].filter(
        (controlElement) => !controlElement.closest('[data-db-honeypot]') && controlElement.type !== 'hidden',
      );
    const clearFormErrors = () => {
      formElement.querySelectorAll('.db-field-error').forEach((errorElement) => (errorElement.textContent = ''));
      formElement.querySelectorAll('.db-field-invalid').forEach((invalidElement) => {
        invalidElement.classList.remove('db-field-invalid');
        invalidElement.removeAttribute('aria-invalid');
      });
    };
    const writeControlError = (controlElement, messageText) => {
      if (!controlElement.id) controlElement.id = 'db-control-' + Math.random().toString(36).slice(2, 9);
      const errorId = controlElement.id + '-error';
      let errorElement = document.getElementById(errorId);
      if (!errorElement) {
        errorElement = document.createElement('small');
        errorElement.id = errorId;
        errorElement.className = 'db-field-error';
        const anchorElement = controlElement.closest('.db-choice-list, .db-choice') || controlElement;
        anchorElement.insertAdjacentElement('afterend', errorElement);
      }
      errorElement.textContent = messageText;
      controlElement.classList.add('db-field-invalid');
      controlElement.setAttribute('aria-invalid', 'true');
      const describedIds = (controlElement.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
      if (describedIds.indexOf(errorId) < 0) describedIds.push(errorId);
      controlElement.setAttribute('aria-describedby', describedIds.join(' '));
    };
    const validateControl = (controlElement) => {
      const rawValue = String(controlElement.value || '').trim();
      const controlType = String(controlElement.type || 'text');
      if (controlType === 'radio') {
        const groupSelector = 'input[type=radio][name="' + controlElement.name + '"]';
        const groupRequired = formElement.querySelector(groupSelector + '[required]');
        return groupRequired && !formElement.querySelector(groupSelector + ':checked') ? 'Choose one option.' : '';
      }
      if (controlType === 'checkbox')
        return controlElement.hasAttribute('required') && !controlElement.checked ? 'This box must be checked.' : '';
      if (controlElement.hasAttribute('required') && !rawValue) return 'This field is required.';
      if (!rawValue) return '';
      if (controlType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawValue))
        return 'Enter a valid email address.';
      if (controlType === 'url' && !/^https?:\/\/\S+$/i.test(rawValue)) return 'Enter a valid web address.';
      if (controlType === 'number') {
        const numericValue = Number(rawValue);
        const minValue = controlElement.getAttribute('min');
        const maxValue = controlElement.getAttribute('max');
        if (numericValue !== numericValue) return 'Enter a number.';
        if (minValue && numericValue < Number(minValue)) return 'Use a value of at least ' + minValue + '.';
        if (maxValue && numericValue > Number(maxValue)) return 'Use a value of at most ' + maxValue + '.';
      }
      return '';
    };
    formElement.addEventListener('submit', (submitEvent) => {
      const honeypotInput = formElement.querySelector('[data-db-honeypot] input');
      if (honeypotInput && honeypotInput.value) return submitEvent.preventDefault();
      const seenRadioGroups = {};
      const invalidControls = [];
      clearFormErrors();
      listControls().forEach((controlElement) => {
        if (controlElement.type === 'radio' && seenRadioGroups[controlElement.name]) return;
        if (controlElement.type === 'radio') seenRadioGroups[controlElement.name] = true;
        const errorText = validateControl(controlElement);
        if (!errorText) return;
        writeControlError(controlElement, errorText);
        invalidControls.push(controlElement);
      });
      if (invalidControls.length) {
        submitEvent.preventDefault();
        setStatusMessage(formElement.getAttribute('data-db-error-message') || 'Please fix the errors above.', 'error');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reducedMotion) invalidControls[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        invalidControls[0].focus({ preventScroll: !reducedMotion });
        return;
      }
      if (!formElement.getAttribute('action')) {
        submitEvent.preventDefault();
        setStatusMessage(formElement.getAttribute('data-db-success-message') || 'Thanks! Message received.', 'success');
        formElement.reset();
        return;
      }
      const submitButton = formElement.querySelector('button[type=submit]');
      if (submitButton) {
        submitButton.setAttribute('disabled', 'disabled');
        submitButton.setAttribute('aria-busy', 'true');
      }
    });
  });
};

export default runFormBehavior;
