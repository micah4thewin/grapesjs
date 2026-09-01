const getNewPageStarterComponents = (pageNameText) => [
  {
    type: 'db-section',
    components: [
      {
        type: 'db-container',
        components: [
          { type: 'db-heading', components: [{ type: 'textnode', content: pageNameText || 'New page' }] },
          { type: 'db-text' },
        ],
      },
    ],
  },
];

export default getNewPageStarterComponents;
