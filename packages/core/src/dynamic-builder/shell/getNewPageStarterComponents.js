const getNewPageStarterComponents = (pageNameText) => [
  {
    type: 'db-section',
    components: [
      {
        type: 'db-container',
        components: [
          {
            type: 'db-heading',
            tagName: 'h1',
            attributes: { 'data-db-level': '1' },
            components: [{ type: 'textnode', content: pageNameText || 'New page' }],
          },
          { type: 'db-text' },
        ],
      },
    ],
  },
];

export default getNewPageStarterComponents;
