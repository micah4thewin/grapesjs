const runFormBehavior = () => {
  document.querySelectorAll('form[data-db-form]').forEach((formElement) => {
    if (formElement.dataset.dbFormReady) return;
    formElement.dataset.dbFormReady = 'true';
    const statusElement = formElement.querySelector('[data-db-form-status]');
    const isActiveElement = (element) => !element.closest('[data-db-honeypot], [hidden], [data-db-inactive]');
    const readControls = (scopeElement) =>
      [...(scopeElement || formElement).querySelectorAll('input, select, textarea')].filter(
        (controlElement) => controlElement.type !== 'hidden' && isActiveElement(controlElement),
      );
    const readRadioGroup = (controlElement) =>
      readControls().filter(
        (otherElement) => otherElement.type === 'radio' && otherElement.name === controlElement.name,
      );
    const setStatus = (messageText, statusKind) => {
      if (!statusElement) return;
      statusElement.textContent = messageText || '';
      statusElement.className = 'db-form-status' + (statusKind ? ' db-form-status-' + statusKind : '');
      statusElement.setAttribute('role', statusKind === 'error' ? 'alert' : 'status');
      statusElement.setAttribute('aria-live', statusKind === 'error' ? 'assertive' : 'polite');
    };
    const resolveErrorElement = (controlElement, createMissing) => {
      const anchorElement = controlElement.closest('.db-choice-list, .db-radio-group, .db-choice') || controlElement;
      const siblingElement = anchorElement.nextElementSibling;
      if (siblingElement && siblingElement.classList.contains('db-field-error')) return siblingElement;
      if (!createMissing) return null;
      if (!controlElement.id) controlElement.id = 'db-control-' + Math.random().toString(36).slice(2, 9);
      const errorElement = document.createElement('small');
      errorElement.className = 'db-field-error';
      errorElement.id = controlElement.id + '-error';
      anchorElement.insertAdjacentElement('afterend', errorElement);
      return errorElement;
    };
    const setControlError = (controlElement, messageText) => {
      const errorElement = resolveErrorElement(controlElement, Boolean(messageText));
      if (errorElement) errorElement.textContent = messageText;
      const targetElements = controlElement.type === 'radio' ? readRadioGroup(controlElement) : [controlElement];
      targetElements.forEach((targetElement) => {
        targetElement.classList.toggle('db-field-invalid', Boolean(messageText));
        if (messageText) targetElement.setAttribute('aria-invalid', 'true');
        else targetElement.removeAttribute('aria-invalid');
        const describedIds = (targetElement.getAttribute('aria-describedby') || '')
          .split(/\s+/)
          .filter((idText) => idText && !(errorElement && idText === errorElement.id));
        if (messageText && errorElement) describedIds.push(errorElement.id);
        if (describedIds.length) targetElement.setAttribute('aria-describedby', describedIds.join(' '));
        else targetElement.removeAttribute('aria-describedby');
      });
    };
    const validateControl = (controlElement) => {
      if (controlElement.type === 'radio') {
        const groupControls = readRadioGroup(controlElement);
        const groupRequired = groupControls.some((radioElement) => radioElement.hasAttribute('required'));
        return groupRequired && !groupControls.some((radioElement) => radioElement.checked) ? 'Choose one option.' : '';
      }
      if (controlElement.type === 'checkbox')
        return controlElement.hasAttribute('required') && !controlElement.checked ? 'Tick this box to continue.' : '';
      const fieldElement = controlElement.closest('[data-db-form-field]');
      if (fieldElement && fieldElement.dbValidateControl) return fieldElement.dbValidateControl(controlElement);
      const isEmpty = !String(controlElement.value || '').trim();
      return controlElement.hasAttribute('required') && isEmpty ? 'Please fill in this field.' : '';
    };
    const validateScope = (scopeElement) => {
      const seenGroups = {};
      const invalidControls = [];
      readControls(scopeElement).forEach((controlElement) => {
        if (controlElement.type === 'radio' && seenGroups[controlElement.name]) return;
        if (controlElement.type === 'radio') seenGroups[controlElement.name] = true;
        const errorText = validateControl(controlElement);
        setControlError(controlElement, errorText);
        if (errorText) invalidControls.push(controlElement);
      });
      return invalidControls;
    };
    const revalidateLive = (inputEvent) => {
      const controlElement = inputEvent.target;
      if (!controlElement || !controlElement.matches || !controlElement.matches('input, select, textarea')) return;
      if (!formElement.dataset.dbSubmitted && !controlElement.classList.contains('db-field-invalid')) return;
      setControlError(controlElement, validateControl(controlElement));
    };
    ['input', 'change'].forEach((eventName) => formElement.addEventListener(eventName, revalidateLive));
    formElement.dbFormApi = { readControls, validateScope, setControlError, setStatus };
    formElement.addEventListener('submit', (submitEvent) => {
      if ((formElement.querySelector('[data-db-honeypot] input') || {}).value) return submitEvent.preventDefault();
      formElement.dataset.dbSubmitted = 'true';
      const invalidControls = validateScope(formElement);
      if (invalidControls.length) {
        submitEvent.preventDefault();
        setStatus(formElement.getAttribute('data-db-error-message') || 'Please fix the errors above.', 'error');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reducedMotion) invalidControls[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        invalidControls[0].focus({ preventScroll: !reducedMotion });
        return;
      }
      setStatus('', '');
      if (formElement.dbFormSend) return formElement.dbFormSend(submitEvent);
      if (formElement.getAttribute('action')) return;
      submitEvent.preventDefault();
      setStatus('This form is not connected yet, so nothing was sent.', 'error');
    });
  });
};

export default runFormBehavior;
