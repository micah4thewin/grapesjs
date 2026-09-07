const createHeadingTypeDefinition = (contentTextDefaults) => ({
  type: 'db-heading',
  extend: 'text',
  isComponent: (el) => el.dataset && el.dataset.dbType === 'heading' && { type: 'db-heading' },
  model: {
    defaults: {
      tagName: 'h2',
      name: 'Heading',
      draggable: true,
      droppable: false,
      attributes: { 'data-db-type': 'heading', 'data-db-level': '2', 'data-db-size': 'auto' },
      classes: ['db-heading'],
      components: contentTextDefaults.headingText,
      traits: [
        {
          type: 'select',
          name: 'data-db-level',
          label: 'Level',
          options: [
            { id: '1', label: 'H1 (page title, one per page)' },
            { id: '2', label: 'H2 (section title)' },
            { id: '3', label: 'H3 (subheading)' },
            { id: '4', label: 'H4' },
            { id: '5', label: 'H5' },
            { id: '6', label: 'H6' },
          ],
        },
        {
          type: 'select',
          name: 'data-db-size',
          label: 'Size',
          options: [
            { id: 'auto', label: 'Match level' },
            { id: 'display', label: 'Extra large (hero)' },
            { id: 'xl', label: 'Extra large' },
            { id: 'lg', label: 'Large' },
            { id: 'md', label: 'Medium' },
            { id: 'sm', label: 'Small' },
          ],
        },
      ],
    },
  },
});

export default createHeadingTypeDefinition;
