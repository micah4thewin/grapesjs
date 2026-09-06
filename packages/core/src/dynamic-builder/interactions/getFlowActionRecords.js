const targetField = {
  name: 'target',
  label: 'Target',
  type: 'text',
  placeholder: 'Leave empty for this element, or #id / .class',
};

const getFlowActionRecords = () => [
  {
    id: 'alert',
    label: 'Show a dialog',
    hint: 'A SweetAlert2 pop-up.',
    fields: [
      {
        name: 'kind',
        label: 'Style',
        type: 'select',
        default: 'success',
        options: [
          { id: 'success', label: 'Success' },
          { id: 'info', label: 'Info' },
          { id: 'warning', label: 'Warning' },
          { id: 'error', label: 'Error' },
          { id: 'question', label: 'Question' },
        ],
      },
      { name: 'title', label: 'Title', type: 'text', default: 'Thanks!', placeholder: 'Thanks!' },
      { name: 'text', label: 'Message', type: 'textarea', placeholder: 'We will be in touch shortly.' },
      { name: 'confirmText', label: 'Confirm button', type: 'text', default: 'OK', placeholder: 'OK' },
      { name: 'cancelText', label: 'Cancel button', type: 'text', placeholder: 'Leave empty to hide' },
      { name: 'timer', label: 'Auto close after (ms)', type: 'number', placeholder: '0 keeps it open' },
    ],
  },
  {
    id: 'toggle-class',
    label: 'Toggle a class',
    hint: 'Add the class when missing, remove it when present.',
    fields: [targetField, { name: 'className', label: 'Class name', type: 'text', placeholder: 'is-open' }],
  },
  {
    id: 'add-class',
    label: 'Add a class',
    fields: [targetField, { name: 'className', label: 'Class name', type: 'text', placeholder: 'is-active' }],
  },
  {
    id: 'remove-class',
    label: 'Remove a class',
    fields: [targetField, { name: 'className', label: 'Class name', type: 'text', placeholder: 'is-active' }],
  },
  { id: 'show', label: 'Show something', fields: [targetField] },
  { id: 'hide', label: 'Hide something', fields: [targetField] },
  { id: 'toggle', label: 'Show or hide something', fields: [targetField] },
  {
    id: 'scroll-to',
    label: 'Scroll to a spot',
    fields: [{ ...targetField, placeholder: '#pricing' }],
  },
  {
    id: 'open-url',
    label: 'Go to a link',
    fields: [
      { name: 'url', label: 'Address', type: 'text', placeholder: 'https://example.com or /contact' },
      {
        name: 'newTab',
        label: 'Open in a new tab',
        type: 'checkbox',
        default: 'false',
      },
    ],
  },
  {
    id: 'set-text',
    label: 'Change some text',
    fields: [targetField, { name: 'text', label: 'New text', type: 'textarea', placeholder: 'Saved!' }],
  },
  {
    id: 'set-attribute',
    label: 'Set an attribute',
    fields: [
      targetField,
      { name: 'attribute', label: 'Attribute', type: 'text', placeholder: 'aria-expanded' },
      { name: 'value', label: 'Value', type: 'text', placeholder: 'true' },
    ],
  },
  { id: 'submit-form', label: 'Submit a form', fields: [{ ...targetField, placeholder: '#signup-form' }] },
  {
    id: 'copy-text',
    label: 'Copy text to the clipboard',
    fields: [
      targetField,
      { name: 'text', label: 'Text to copy', type: 'text', placeholder: 'Leave empty to copy the target text' },
    ],
  },
  { id: 'replay-animation', label: 'Replay the scroll animation', fields: [targetField] },
  {
    id: 'wait',
    label: 'Wait',
    hint: 'Pause before the next step.',
    fields: [{ name: 'delay', label: 'Wait (ms)', type: 'number', default: '400' }],
  },
  {
    id: 'custom-js',
    label: 'Run custom JavaScript',
    hint: 'Only runs on exports when "Allow script tags" is on. `element` and `event` are available.',
    fields: [{ name: 'code', label: 'JavaScript', type: 'textarea', placeholder: "console.log('hi', element);" }],
  },
];

export default getFlowActionRecords;
