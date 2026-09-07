import addFormStep from './addFormStep.js';
import openAddFieldModal from './openAddFieldModal.js';

const messagesCategory = { id: 'db-form-messages', label: 'Messages', open: false };
const advancedCategory = { id: 'db-form-advanced', label: 'Advanced', open: false };

const buildFormTraitDefinitions = () => [
  {
    type: 'button',
    name: 'db-form-add-field',
    label: '',
    text: 'Add a field',
    full: true,
    command: (editor) => openAddFieldModal(editor, editor.getSelected()),
  },
  { type: 'db-form-destination', name: 'data-db-recipe', label: 'Where do submissions go?' },
  { type: 'db-form-preview', name: 'db-form-preview', label: 'Preview a state' },
  { type: 'text', name: 'data-db-success-message', label: 'After a successful send', category: messagesCategory },
  { type: 'text', name: 'data-db-error-message', label: 'When fields need fixing', category: messagesCategory },
  { type: 'text', name: 'data-db-failure-message', label: 'When sending fails', category: messagesCategory },
  {
    type: 'db-page-url',
    name: 'data-db-redirect-url',
    label: 'After success, open this page',
    category: messagesCategory,
  },
  {
    type: 'checkbox',
    name: 'data-db-hide-on-success',
    label: 'Hide the form after success',
    valueTrue: 'true',
    valueFalse: 'false',
    category: messagesCategory,
  },
  {
    type: 'button',
    name: 'db-form-add-step',
    label: '',
    text: 'Split into steps',
    full: true,
    category: advancedCategory,
    command: (editor) => addFormStep(editor, editor.getSelected()),
  },
  { type: 'text', name: 'name', label: 'Form name', placeholder: 'contact', category: advancedCategory },
  {
    type: 'select',
    name: 'data-db-submit-mode',
    label: 'After pressing send',
    category: advancedCategory,
    options: [
      { id: 'fetch', label: 'Stay on this page and show a message' },
      { id: 'native', label: 'Open the service page' },
    ],
  },
];

export default buildFormTraitDefinitions;
