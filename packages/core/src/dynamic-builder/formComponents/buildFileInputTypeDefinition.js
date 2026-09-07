const buildFileInputTypeDefinition = () => ({
  type: 'db-file-input',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'file-input') && { type: 'db-file-input' },
  model: {
    defaults: {
      tagName: 'input',
      name: 'File upload',
      draggable: '[data-db-type=form-field]',
      droppable: false,
      classes: ['db-field-control', 'db-file-input'],
      attributes: {
        'data-db-type': 'file-input',
        'data-db-form-control': 'true',
        type: 'file',
        name: 'attachment',
        accept: '.pdf,image/*',
        'data-db-max-size-mb': '10',
      },
      traits: [
        {
          type: 'text',
          name: 'accept',
          label: 'Accepted file types',
          placeholder: '.pdf,image/*',
        },
        { type: 'number', name: 'data-db-max-size-mb', label: 'Largest file allowed (MB)', min: 1 },
        { type: 'text', name: 'name', label: 'Field name', placeholder: 'attachment' },
      ],
    },
  },
});

export default buildFileInputTypeDefinition;
