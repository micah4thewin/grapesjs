import buildMarketingPlaceholderUri from './buildMarketingPlaceholderUri.js';

const buildHeroDefaultChildren = () => [
  {
    tagName: 'div',
    name: 'Hero inner',
    classes: ['db-hero-inner'],
    components: [
      {
        tagName: 'div',
        name: 'Hero copy',
        classes: ['db-hero-copy'],
        components: [
          {
            tagName: 'span',
            type: 'text',
            name: 'Hero eyebrow',
            classes: ['db-hero-eyebrow'],
            components: 'Just launched',
          },
          {
            tagName: 'h1',
            type: 'text',
            name: 'Hero title',
            classes: ['db-hero-title'],
            components: 'Build landing pages that convert',
          },
          {
            tagName: 'p',
            type: 'text',
            name: 'Hero lead',
            classes: ['db-hero-lead'],
            components:
              'Everything you need to design, publish, and grow a marketing site: flexible sections, accessible defaults, and performance built in.',
          },
          { type: 'db-button-group' },
        ],
      },
      {
        tagName: 'figure',
        name: 'Hero media',
        classes: ['db-hero-media'],
        components: [
          {
            type: 'db-image',
            classes: ['db-image', 'db-hero-image'],
            attributes: {
              src: buildMarketingPlaceholderUri('hero'),
              alt: 'Product interface preview',
              loading: 'eager',
              decoding: 'async',
              fetchpriority: 'high',
              width: '960',
              height: '640',
            },
          },
        ],
      },
    ],
  },
];

export default buildHeroDefaultChildren;
