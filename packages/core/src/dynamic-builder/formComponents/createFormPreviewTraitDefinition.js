import resolveTraitInnerElement from '../traits/resolveTraitInnerElement.js';
import applyFormPreviewState from './applyFormPreviewState.js';

const previewStateRecords = [
  { id: 'idle', label: 'Before the visitor types' },
  { id: 'errors', label: 'With errors to fix' },
  { id: 'sending', label: 'While sending' },
  { id: 'success', label: 'After success' },
  { id: 'failure', label: 'When sending fails' },
  { id: 'not-connected', label: 'When not connected' },
];

const createFormPreviewTraitDefinition = () => ({
  createInput: () =>
    [
      '<div class="gjs-db-field">',
      '<select class="gjs-db-field-input" data-db-form-preview aria-label="Preview a form state">',
      previewStateRecords
        .map((stateRecord) => `<option value="${stateRecord.id}">${stateRecord.label}</option>`)
        .join(''),
      '</select>',
      '<p class="gjs-db-field-help">Only changes what you see on the canvas so you can style each state.</p>',
      '</div>',
    ].join(''),
  onEvent: ({ component, elInput }) => {
    const selectElement = resolveTraitInnerElement(elInput, '[data-db-form-preview]');
    if (!selectElement || !component) return;
    applyFormPreviewState(component, selectElement.value);
  },
  onUpdate: ({ elInput }) => {
    const selectElement = resolveTraitInnerElement(elInput, '[data-db-form-preview]');
    if (selectElement && !selectElement.value) selectElement.value = 'idle';
  },
});

export default createFormPreviewTraitDefinition;
