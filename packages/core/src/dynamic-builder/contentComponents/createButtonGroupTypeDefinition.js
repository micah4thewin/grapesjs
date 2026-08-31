const createButtonGroupTypeDefinition = (contentTextDefaults) => ({
  type: 'db-button-group',
  isComponent: (el) => el.dataset && el.dataset.dbType === 'button-group' && { type: 'db-button-group' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Button Group',
      draggable: true,
      droppable: '[data-db-type="button"]',
      attributes: {
        'data-db-type': 'button-group',
        'data-db-gap': 'md',
        'data-db-wrap': 'true',
        'data-db-align': 'start',
      },
      classes: ['db-button-group'],
      components: [
        { type: 'db-button' },
        {
          type: 'db-button',
          attributes: { 'data-db-variant': 'secondary' },
          components: contentTextDefaults.secondaryButtonLabelText,
        },
      ],
      traits: [
        {
          type: 'select',
          name: 'data-db-gap',
          label: 'Gap',
          options: [
            { id: 'sm', label: 'Small' },
            { id: 'md', label: 'Medium' },
            { id: 'lg', label: 'Large' },
          ],
        },
        { type: 'checkbox', name: 'data-db-wrap', label: 'Allow wrapping', valueTrue: 'true' },
        {
          type: 'select',
          name: 'data-db-align',
          label: 'Alignment',
          options: [
            { id: 'start', label: 'Start' },
            { id: 'center', label: 'Center' },
            { id: 'end', label: 'End' },
            { id: 'between', label: 'Space between' },
          ],
        },
      ],
    },
  },
});

export default createButtonGroupTypeDefinition;
