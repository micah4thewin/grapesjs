const buildAlertButtonTraitDefinitions = () => [
  {
    type: 'select',
    name: 'data-db-alert-kind',
    label: 'Dialog style',
    default: 'success',
    options: [
      { id: 'success', label: 'Success' },
      { id: 'info', label: 'Info' },
      { id: 'warning', label: 'Warning' },
      { id: 'error', label: 'Error' },
      { id: 'question', label: 'Question' },
    ],
  },
  { type: 'text', name: 'data-db-alert-title', label: 'Title', placeholder: 'Thanks!' },
  { type: 'db-textarea-trait', name: 'data-db-alert-text', label: 'Message', placeholder: 'We got your details.' },
  { type: 'text', name: 'data-db-alert-confirm', label: 'Confirm button', placeholder: 'OK' },
  { type: 'text', name: 'data-db-alert-cancel', label: 'Cancel button', placeholder: 'Leave empty to hide' },
  {
    type: 'select',
    name: 'data-db-alert-then',
    label: 'After confirming',
    default: 'none',
    options: [
      { id: 'none', label: 'Just close' },
      { id: 'open-url', label: 'Go to a link' },
      { id: 'submit-form', label: 'Submit a form' },
    ],
  },
  {
    type: 'db-url',
    name: 'data-db-alert-url',
    label: 'Link or form selector',
    placeholder: '/thank-you or #signup-form',
  },
];

export default buildAlertButtonTraitDefinitions;
