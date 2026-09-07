const ensureFormStepsNav = (formComponent) => {
  if (!formComponent || !formComponent.is || !formComponent.is('db-form')) return;
  const hasSteps = formComponent.findType('db-form-step').length > 0;
  const navComponents = formComponent.findType('db-form-steps-nav');
  if (!hasSteps) {
    navComponents.forEach((navComponent) => navComponent.remove());
    return;
  }
  if (navComponents.length) return;
  const childModels = formComponent.components().models;
  const submitIndex = childModels.findIndex((childComponent) => childComponent.is('db-submit-button'));
  formComponent.append({ type: 'db-form-steps-nav' }, { at: submitIndex < 0 ? childModels.length : submitIndex });
};

export default ensureFormStepsNav;
