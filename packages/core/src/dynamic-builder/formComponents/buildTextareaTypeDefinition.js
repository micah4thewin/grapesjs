const buildTextareaTypeDefinition = (formTextDefaults) => ({
  type: 'db-textarea',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'textarea') && { type: 'db-textarea' },
  model: {
    defaults: {
      tagName: 'textarea',
      name: 'Long text box',
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
        { type: 'text', name: 'placeholder', label: 'Hint shown inside the box' },
        { type: 'number', name: 'rows', label: 'Visible lines', min: 2, max: 30 },
        { type: 'number', name: 'maxlength', label: 'Maximum characters', min: 1 },
        { type: 'text', name: 'name', label: 'Field name', placeholder: 'message' },
      ],
    },
  },
});

export default buildTextareaTypeDefinition;
