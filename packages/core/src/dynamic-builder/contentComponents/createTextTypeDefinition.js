const createTextTypeDefinition = (contentTextDefaults) => ({
  type: 'db-text',
  extend: 'text',
  isComponent: (el) => el.dataset && el.dataset.dbType === 'text' && { type: 'db-text' },
  model: {
    defaults: {
      tagName: 'p',
      name: 'Text',
      draggable: true,
      droppable: false,
      attributes: { 'data-db-type': 'text', 'data-db-variant': 'body' },
      classes: ['db-text'],
      components: contentTextDefaults.paragraphText,
      traits: [
        {
          type: 'select',
          name: 'data-db-variant',
          label: 'Variant',
          options: [
            { id: 'body', label: 'Body' },
            { id: 'lead', label: 'Lead' },
            { id: 'small', label: 'Small' },
            { id: 'caption', label: 'Caption' },
          ],
        },
      ],
    },
  },
});

export default createTextTypeDefinition;
