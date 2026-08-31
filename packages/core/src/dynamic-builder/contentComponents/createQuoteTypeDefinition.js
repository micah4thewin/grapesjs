const createQuoteTypeDefinition = (contentTextDefaults) => ({
  type: 'db-quote',
  isComponent: (el) => el.dataset && el.dataset.dbType === 'quote' && { type: 'db-quote' },
  model: {
    defaults: {
      tagName: 'blockquote',
      name: 'Quote',
      draggable: true,
      droppable: false,
      attributes: { 'data-db-type': 'quote' },
      classes: ['db-quote'],
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
        {
          type: 'text',
          tagName: 'cite',
          name: 'Quote source',
          classes: ['db-quote-cite'],
          draggable: false,
          droppable: false,
          components: contentTextDefaults.quoteCiteText,
        },
      ],
    },
  },
});

export default createQuoteTypeDefinition;
