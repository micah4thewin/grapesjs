const getLandingTemplateComponents = () => [
  { type: 'db-navbar' },
  { type: 'db-hero' },
  { type: 'db-features' },
  { type: 'db-stats' },
  {
    type: 'db-section',
    components: [{ type: 'db-container', components: [{ type: 'db-testimonial' }] }],
  },
  {
    type: 'db-section',
    attributes: { 'data-db-theme': 'brand' },
    components: [
      {
        type: 'db-container',
        components: [
          { type: 'db-heading', components: [{ type: 'textnode', content: 'Ready to get started?' }] },
          {
            type: 'db-text',
            components: [{ type: 'textnode', content: 'Join thousands of happy customers building with us today.' }],
          },
          { type: 'db-button-group' },
        ],
      },
    ],
  },
  { type: 'db-footer' },
];

export default getLandingTemplateComponents;
