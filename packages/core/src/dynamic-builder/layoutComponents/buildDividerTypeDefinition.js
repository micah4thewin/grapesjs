const buildDividerTypeDefinition = () => ({
  type: 'db-divider',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'divider') && { type: 'db-divider' },
  model: {
    defaults: {
      tagName: 'hr',
      name: 'Divider',
      droppable: false,
      classes: ['db-divider'],
      attributes: { 'data-db-type': 'divider', 'data-db-divider': 'solid' },
      traits: [
        {
          type: 'select',
          name: 'data-db-divider',
          label: 'Style',
          default: 'solid',
          options: [
            { id: 'solid', label: 'Solid' },
            { id: 'dashed', label: 'Dashed' },
            { id: 'decorative', label: 'Decorative' },
          ],
        },
      ],
    },
  },
});

export default buildDividerTypeDefinition;
