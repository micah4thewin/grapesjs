import buildHeroMediaRecord from './buildHeroMediaRecord.js';

const buildHeroDefaultChildren = () => [
  {
    tagName: 'div',
    name: 'Hero inner',
    classes: ['db-hero-inner'],
    attributes: { 'data-db-hero-inner': 'true' },
    components: [
      {
        tagName: 'div',
        name: 'Hero copy',
        classes: ['db-hero-copy'],
        components: [
          {
            tagName: 'span',
            type: 'text',
            name: 'Small label',
            classes: ['db-hero-eyebrow'],
            components: 'Welcome',
          },
          {
            tagName: 'h1',
            type: 'text',
            name: 'Hero title',
            classes: ['db-hero-title'],
            components: 'Grow your business with confidence',
          },
          {
            tagName: 'p',
            type: 'text',
            name: 'Hero lead',
            classes: ['db-hero-lead'],
            components:
              'Tell visitors what you offer, who it is for, and why they should choose you. Keep it short and friendly.',
          },
          { type: 'db-button-group' },
        ],
      },
      buildHeroMediaRecord(),
    ],
  },
];

export default buildHeroDefaultChildren;
