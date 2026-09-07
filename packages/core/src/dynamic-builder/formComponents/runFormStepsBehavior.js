const runFormStepsBehavior = () => {
  document.querySelectorAll('form[data-db-form]').forEach((formElement) => {
    const stepElements = [...formElement.querySelectorAll('[data-db-form-step]')];
    if (!stepElements.length || formElement.dataset.dbStepsReady) return;
    formElement.dataset.dbStepsReady = 'true';
    const findNavPart = (partName) =>
      formElement.querySelector('[data-db-form-steps-nav] [data-db-step-' + partName + ']');
    const backButton = findNavPart('back');
    const nextButton = findNavPart('next');
    const progressBar = findNavPart('progress-bar');
    const progressText = findNavPart('progress-text');
    let activeIndex = 0;
    const showStep = (nextIndex, moveFocus) => {
      activeIndex = Math.max(0, Math.min(stepElements.length - 1, nextIndex));
      stepElements.forEach((stepElement, stepIndex) => {
        const isActive = stepIndex === activeIndex;
        stepElement.hidden = !isActive;
        if (isActive) stepElement.removeAttribute('data-db-inactive');
        else stepElement.setAttribute('data-db-inactive', 'true');
      });
      const isLastStep = activeIndex === stepElements.length - 1;
      const activeStep = stepElements[activeIndex];
      formElement.setAttribute('data-db-step-last', isLastStep ? 'true' : 'false');
      if (backButton) backButton.hidden = activeIndex === 0;
      if (nextButton) nextButton.hidden = isLastStep;
      if (progressBar) progressBar.style.width = Math.round(((activeIndex + 1) / stepElements.length) * 100) + '%';
      const legendElement = activeStep.querySelector('legend');
      const stepTitle = legendElement ? legendElement.textContent.trim() : '';
      if (progressText)
        progressText.textContent =
          'Step ' + (activeIndex + 1) + ' of ' + stepElements.length + (stepTitle ? ': ' + stepTitle : '');
      if (!moveFocus) return;
      const focusTarget = activeStep.querySelector('input:not([type=hidden]), select, textarea');
      if (focusTarget) focusTarget.focus();
    };
    const goForward = () => {
      const formApi = formElement.dbFormApi;
      const invalidControls = formApi ? formApi.validateScope(stepElements[activeIndex]) : [];
      if (invalidControls.length) return invalidControls[0].focus();
      showStep(activeIndex + 1, true);
    };
    if (nextButton) nextButton.addEventListener('click', goForward);
    if (backButton) backButton.addEventListener('click', () => showStep(activeIndex - 1, true));
    formElement.addEventListener(
      'submit',
      (submitEvent) => {
        if (activeIndex === stepElements.length - 1) return;
        submitEvent.preventDefault();
        submitEvent.stopImmediatePropagation();
        goForward();
      },
      true,
    );
    showStep(0, false);
  });
};

export default runFormStepsBehavior;
