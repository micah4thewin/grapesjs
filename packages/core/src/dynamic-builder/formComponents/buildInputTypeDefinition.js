const buildInputTypeDefinition = (formTextDefaults) => ({
  type: 'db-input',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'input') && { type: 'db-input' },
  model: {
    defaults: {
      tagName: 'input',
      name: 'Input',
      draggable: '[data-db-type=form-field]',
      droppable: false,
      classes: ['db-field-control', 'db-input'],
      attributes: {
        'data-db-type': 'input',
        'data-db-form-control': 'true',
        type: 'text',
        name: 'field',
        placeholder: formTextDefaults.inputPlaceholderText,
      },
      traits: [
        {
          type: 'select',
          name: 'type',
          label: 'Input type',
          options: [
            { id: 'text', label: 'Text' },
            { id: 'email', label: 'Email' },
            { id: 'tel', label: 'Phone' },
            { id: 'url', label: 'URL' },
            { id: 'number', label: 'Number' },
            { id: 'password', label: 'Password' },
            { id: 'date', label: 'Date' },
            { id: 'time', label: 'Time' },
          ],
        },
        { type: 'text', name: 'name', label: 'Field name' },
        { type: 'text', name: 'placeholder', label: 'Placeholder' },
        { type: 'text', name: 'autocomplete', label: 'Autocomplete', placeholder: 'email, name, tel' },
        { type: 'number', name: 'min', label: 'Min (numeric)' },
        { type: 'number', name: 'max', label: 'Max (numeric)' },
      ],
    },
  },
});

export default buildInputTypeDefinition;
