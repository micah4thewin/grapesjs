const runConditionalFieldsBehavior = () => {
  document.querySelectorAll('form[data-db-form]').forEach((formElement) => {
    const conditionalElements = [...formElement.querySelectorAll('[data-db-show-when-field]')];
    if (!conditionalElements.length || formElement.dataset.dbConditionsReady) return;
    formElement.dataset.dbConditionsReady = 'true';
    const readFieldValue = (fieldName) => {
      const controls = [...formElement.querySelectorAll('input, select, textarea')].filter(
        (controlElement) => controlElement.name === fieldName,
      );
      if (!controls.length) return '';
      if (controls[0].type === 'checkbox' || controls[0].type === 'radio')
        return controls
          .filter((controlElement) => controlElement.checked)
          .map((controlElement) => controlElement.value)
          .join(',');
      return String(controls[0].value || '');
    };
    const matchesRule = (actualValue, operatorName, expectedValue) => {
      const actualText = actualValue.trim().toLowerCase();
      const expectedText = String(expectedValue || '')
        .trim()
        .toLowerCase();
      if (operatorName === 'not-empty') return actualText !== '';
      if (operatorName === 'empty') return actualText === '';
      if (operatorName === 'not-equals') return actualText !== expectedText;
      if (operatorName === 'contains') return actualText.indexOf(expectedText) >= 0;
      return actualText === expectedText;
    };
    const applyRules = () => {
      conditionalElements.forEach((targetElement) => {
        const ruleData = targetElement.dataset;
        const shouldShow = matchesRule(
          readFieldValue(ruleData.dbShowWhenField),
          ruleData.dbShowWhenOp || 'equals',
          ruleData.dbShowWhenValue,
        );
        targetElement.hidden = !shouldShow;
        if (shouldShow) targetElement.removeAttribute('data-db-inactive');
        else targetElement.setAttribute('data-db-inactive', 'true');
        if (shouldShow || !formElement.dbFormApi) return;
        targetElement
          .querySelectorAll('.db-field-invalid')
          .forEach((controlElement) => formElement.dbFormApi.setControlError(controlElement, ''));
      });
    };
    formElement.addEventListener('input', applyRules);
    formElement.addEventListener('change', applyRules);
    applyRules();
  });
};

export default runConditionalFieldsBehavior;
