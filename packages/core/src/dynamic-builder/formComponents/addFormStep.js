import showToastNotice from '../support/showToastNotice.js';
import ensureFormStepsNav from './ensureFormStepsNav.js';
import findFormInsertIndex from './findFormInsertIndex.js';

const isStepContent = (childComponent) =>
  !['db-consent-checkbox', 'db-honeypot', 'db-form-steps-nav', 'db-submit-button', 'db-form-status'].includes(
    String(childComponent.get('type') || ''),
  );

const addFormStep = (editor, selectedComponent) => {
  const formComponent =
    selectedComponent && selectedComponent.closestType
      ? selectedComponent.is('db-form')
        ? selectedComponent
        : selectedComponent.closestType('db-form')
      : null;
  if (!formComponent) {
    showToastNotice(editor, 'Select a form first, then add a step', { kind: 'error' });
    return null;
  }
  const existingSteps = formComponent.findType('db-form-step');
  const stepNumber = existingSteps.length + 1;
  let addedStep = null;
  if (!existingSteps.length) {
    const movedChildren = formComponent.components().models.filter(isStepContent);
    addedStep = formComponent.append(
      { type: 'db-form-step', attributes: { 'data-db-legend': 'Step 1' } },
      { at: 0 },
    )[0];
    movedChildren.forEach((childComponent) => addedStep.append(childComponent));
    addedStep = formComponent.append(
      { type: 'db-form-step', attributes: { 'data-db-legend': 'Step 2' } },
      { at: findFormInsertIndex(formComponent) },
    )[0];
  } else {
    addedStep = formComponent.append(
      { type: 'db-form-step', attributes: { 'data-db-legend': 'Step ' + stepNumber } },
      { at: formComponent.components().indexOf(existingSteps[existingSteps.length - 1]) + 1 },
    )[0];
  }
  ensureFormStepsNav(formComponent);
  editor.select(addedStep);
  showToastNotice(editor, 'Added step ' + Math.max(stepNumber, 2) + '. Drag fields into it or use Add a field.', {
    kind: 'success',
  });
  return addedStep;
};

export default addFormStep;
