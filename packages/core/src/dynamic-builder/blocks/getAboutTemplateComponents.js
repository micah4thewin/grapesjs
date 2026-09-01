const getAboutTemplateComponents = () => [
  { type: 'db-navbar' },
  {
    type: 'db-section',
    components: [
      {
        type: 'db-container',
        components: [
          { type: 'db-heading', components: [{ type: 'textnode', content: 'About us' }] },
          {
            type: 'db-text',
            components: [
              {
                type: 'textnode',
                content: 'We are a small team that cares deeply about our craft and the people we build for.',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'db-section',
    components: [
      {
        type: 'db-container',
        components: [
          { type: 'db-heading', components: [{ type: 'textnode', content: 'Meet the team' }] },
          {
            type: 'db-columns',
            components: [
              { type: 'db-column', components: [{ type: 'db-team-member' }] },
              { type: 'db-column', components: [{ type: 'db-team-member' }] },
              { type: 'db-column', components: [{ type: 'db-team-member' }] },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'db-section',
    components: [{ type: 'db-container', components: [{ type: 'db-logo-cloud' }] }],
  },
  { type: 'db-footer' },
];

export default getAboutTemplateComponents;
