const buildTextareaTypeDefinition = (formTextDefaults) => ({
  type: 'db-textarea',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'textarea') && { type: 'db-textarea' },
  model: {
    defaults: {
      tagName: 'textarea',
      name: 'Textarea',
      draggable: '[data-db-type=form-field]',
      droppable: false,
      classes: ['db-field-control', 'db-textarea'],
      attributes: {
        'data-db-type': 'textarea',
        'data-db-form-control': 'true',
        name: 'message',
        rows: '5',
        placeholder: formTextDefaults.textareaPlaceholderText,
      },
      traits: [
        { type: 'text', name: 'name', label: 'Field name' },
        { type: 'text', name: 'placeholder', label: 'Placeholder' },
        { type: 'number', name: 'rows', label: 'Rows', min: 2, max: 30 },
      ],
    },
  },
});

export default buildTextareaTypeDefinition;
