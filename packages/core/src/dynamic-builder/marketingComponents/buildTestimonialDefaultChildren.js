import buildMarketingPlaceholderUri from './buildMarketingPlaceholderUri.js';

const buildTestimonialDefaultChildren = () => [
  {
    tagName: 'blockquote',
    name: 'Testimonial quote',
    classes: ['db-testimonial-quote'],
    components: [
      {
        tagName: 'p',
        type: 'text',
        name: 'Quote text',
        components:
          '\u201CWe rebuilt our whole marketing site in a week. The defaults are so good that the first draft already looked like the finished product.\u201D',
      },
    ],
  },
  {
    tagName: 'figcaption',
    name: 'Testimonial caption',
    classes: ['db-testimonial-caption'],
    components: [
      {
        type: 'db-image',
        classes: ['db-image', 'db-testimonial-avatar'],
        attributes: {
          src: buildMarketingPlaceholderUri('avatar'),
          alt: 'Portrait of Maya Chen',
          loading: 'lazy',
          decoding: 'async',
          width: '96',
          height: '96',
        },
      },
      {
        tagName: 'div',
        name: 'Attribution',
        classes: ['db-testimonial-meta'],
        components: [
          {
            tagName: 'span',
            type: 'text',
            name: 'Name',
            classes: ['db-testimonial-name'],
            components: 'Maya Chen',
          },
          {
            tagName: 'span',
            type: 'text',
            name: 'Role',
            classes: ['db-testimonial-role'],
            components: 'Head of Growth, Northwind',
          },
        ],
      },
    ],
  },
];

export default buildTestimonialDefaultChildren;
