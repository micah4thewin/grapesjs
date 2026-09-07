const createButtonGroupTypeDefinition = (contentTextDefaults) => ({
  type: 'db-button-group',
  isComponent: (el) => el.dataset && el.dataset.dbType === 'button-group' && { type: 'db-button-group' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Button group',
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
        { type: 'db-button', name: 'Main button' },
        {
          type: 'db-button',
          name: 'Second button',
          attributes: { 'data-db-variant': 'secondary' },
          components: contentTextDefaults.secondaryButtonLabelText,
        },
      ],
      traits: [
        {
          type: 'select',
          name: 'data-db-align',
          label: 'Align',
          options: [
            { id: 'start', label: 'Left' },
            { id: 'center', label: 'Center' },
            { id: 'end', label: 'Right' },
            { id: 'between', label: 'Spread out' },
          ],
        },
        {
          type: 'select',
          name: 'data-db-gap',
          label: 'Space between buttons',
          options: [
            { id: 'sm', label: 'Small' },
            { id: 'md', label: 'Medium' },
            { id: 'lg', label: 'Large' },
          ],
        },
        { type: 'checkbox', name: 'data-db-wrap', label: 'Wrap onto new lines when needed', valueTrue: 'true' },
      ],
    },
  },
});

export default createButtonGroupTypeDefinition;
