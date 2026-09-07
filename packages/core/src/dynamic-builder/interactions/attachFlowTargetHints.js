import describeTargetMatches from './describeTargetMatches.js';

const refreshTargetHint = (inputElement, canvasDocument) => {
  const fieldElement = inputElement.closest('.gjs-db-flow-field-target');
  const hintElement = fieldElement && fieldElement.querySelector('[data-db-flow-target-hint]');
  if (!hintElement) return;
  const matchRecord = describeTargetMatches(canvasDocument, inputElement.value);
  hintElement.textContent = matchRecord.text;
  fieldElement.setAttribute('data-db-flow-target-state', matchRecord.state);
};

const attachFlowTargetHints = (formElement, canvasDocument) => {
  formElement.querySelectorAll('[data-db-flow-target-input]').forEach((inputElement) => {
    refreshTargetHint(inputElement, canvasDocument);
  });
  formElement.addEventListener('input', (inputEvent) => {
    if (!inputEvent.target.matches || !inputEvent.target.matches('[data-db-flow-target-input]')) return;
    refreshTargetHint(inputEvent.target, canvasDocument);
  });
};

export default attachFlowTargetHints;
