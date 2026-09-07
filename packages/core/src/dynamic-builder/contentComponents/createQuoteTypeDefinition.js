const createQuoteTypeDefinition = (contentTextDefaults) => ({
  type: 'db-quote',
  isComponent: (el) => el.dataset && el.dataset.dbType === 'quote' && { type: 'db-quote' },
  model: {
    defaults: {
      tagName: 'figure',
      name: 'Quote',
      draggable: true,
      droppable: false,
      attributes: { 'data-db-type': 'quote', 'data-db-quote': 'bordered' },
      classes: ['db-quote'],
      components: [
        {
          tagName: 'blockquote',
          name: 'Quote body',
          classes: ['db-quote-body'],
          draggable: false,
          droppable: false,
          removable: false,
          copyable: false,
          components: [
            {
              type: 'text',
              tagName: 'p',
              name: 'Quote text',
              classes: ['db-quote-text'],
              draggable: false,
              droppable: false,
              removable: false,
              components: contentTextDefaults.quoteText,
            },
          ],
        },
        {
          type: 'text',
          tagName: 'figcaption',
          name: 'Quote source',
          classes: ['db-quote-cite'],
          draggable: false,
          droppable: false,
          removable: false,
          components: contentTextDefaults.quoteCiteText,
        },
      ],
      traits: [
        {
          type: 'select',
          name: 'data-db-quote',
          label: 'Style',
          options: [
            { id: 'bordered', label: 'Bordered card' },
            { id: 'plain', label: 'Plain' },
            { id: 'large', label: 'Large and centered' },
          ],
        },
        { type: 'checkbox', name: 'data-db-hide-source', label: 'Hide the source line', valueTrue: 'true' },
      ],
    },
  },
});

export default createQuoteTypeDefinition;
