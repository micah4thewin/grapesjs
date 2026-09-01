const getContactTemplateComponents = () => [
  { type: 'db-navbar' },
  {
    type: 'db-section',
    components: [
      {
        type: 'db-container',
        components: [
          { type: 'db-heading', components: [{ type: 'textnode', content: 'Get in touch' }] },
          {
            type: 'db-text',
            components: [
              { type: 'textnode', content: 'Send us a message and we will get back to you within one business day.' },
            ],
          },
          {
            type: 'db-columns',
            attributes: { 'data-db-columns': 'two' },
            components: [
              { type: 'db-column', components: [{ type: 'db-form' }] },
              { type: 'db-column', components: [{ type: 'db-contact' }, { type: 'db-map' }] },
            ],
          },
        ],
      },
    ],
  },
  { type: 'db-footer' },
];

export default getContactTemplateComponents;
