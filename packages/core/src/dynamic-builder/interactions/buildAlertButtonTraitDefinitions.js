const buildFollowUpTraits = (thenValue, formOptions) => {
  if (thenValue === 'open-url') {
    return [
      {
        type: 'db-url',
        name: 'data-db-alert-url',
        label: 'Link to open',
        placeholder: '/thank-you or https://',
        attributes: { title: 'Where the visitor goes after pressing the confirm button.' },
      },
    ];
  }
  if (thenValue === 'submit-form') {
    return [
      {
        type: 'select',
        name: 'data-db-alert-form',
        label: 'Form to submit',
        attributes: { title: 'The form on this page that gets sent after the visitor confirms.' },
        options: formOptions.length
          ? [{ id: '', label: 'Choose a form' }, ...formOptions]
          : [{ id: '', label: 'No forms on this page yet' }],
      },
    ];
  }
  return [];
};

const buildAlertButtonTraitDefinitions = (attributesRecord = {}, formOptions = []) => {
  const thenValue = String(attributesRecord['data-db-alert-then'] || 'none');
  return [
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
    { type: 'db-textarea-trait', name: 'data-db-alert-text', label: 'Message', placeholder: 'Thanks for stopping by.' },
    { type: 'text', name: 'data-db-alert-confirm', label: 'Confirm button', placeholder: 'OK' },
    { type: 'text', name: 'data-db-alert-cancel', label: 'Cancel button', placeholder: 'Leave empty to hide' },
    {
      type: 'select',
      name: 'data-db-alert-then',
      label: 'Then',
      default: 'none',
      attributes: { title: 'What happens after the visitor presses the confirm button.' },
      options: [
        { id: 'none', label: 'Just close' },
        { id: 'open-url', label: 'Go to a link' },
        { id: 'submit-form', label: 'Submit a form' },
      ],
    },
    ...buildFollowUpTraits(thenValue, formOptions),
  ];
};

export default buildAlertButtonTraitDefinitions;
