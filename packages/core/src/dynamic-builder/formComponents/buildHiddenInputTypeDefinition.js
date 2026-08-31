const buildHiddenInputTypeDefinition = () => ({
  type: 'db-hidden-input',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'hidden-input') && { type: 'db-hidden-input' },
  model: {
    defaults: {
      tagName: 'input',
      name: 'Hidden input',
      draggable: '[data-db-type=form]',
      droppable: false,
      attributes: {
        'data-db-type': 'hidden-input',
        'data-db-form-child': 'true',
        type: 'hidden',
        name: 'source',
        value: 'website',
      },
      traits: [
        { type: 'text', name: 'name', label: 'Field name' },
        { type: 'text', name: 'value', label: 'Value' },
      ],
    },
  },
});

export default buildHiddenInputTypeDefinition;
