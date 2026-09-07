const buildHiddenInputTypeDefinition = () => ({
  type: 'db-hidden-input',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'hidden-input') && { type: 'db-hidden-input' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Hidden field',
      draggable: '[data-db-type=form]',
      droppable: false,
      classes: ['db-hidden-field'],
      attributes: {
        'data-db-type': 'hidden-input',
        'data-db-form-child': 'true',
        'data-db-name': 'source',
        'data-db-value': 'website',
      },
      components: [
        {
          tagName: 'input',
          attributes: { type: 'hidden', name: 'source', value: 'website' },
          selectable: false,
          hoverable: false,
          layerable: false,
          draggable: false,
          removable: false,
          copyable: false,
          traits: [],
        },
      ],
      traits: [
        { type: 'text', name: 'data-db-name', label: 'Field name', placeholder: 'source' },
        { type: 'text', name: 'data-db-value', label: 'Value sent with the form', placeholder: 'website' },
      ],
    },
  },
});

export default buildHiddenInputTypeDefinition;
