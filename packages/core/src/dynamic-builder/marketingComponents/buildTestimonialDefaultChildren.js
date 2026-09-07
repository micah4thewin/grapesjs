import buildMarketingPlaceholderUri from './buildMarketingPlaceholderUri.js';
import buildTestimonialRatingMarkup from './buildTestimonialRatingMarkup.js';

const buildTestimonialDefaultChildren = (presetRecord) => [
  {
    tagName: 'span',
    name: 'Star rating',
    classes: ['db-testimonial-rating'],
    attributes: { 'data-db-testimonial-rating': 'true', role: 'img', 'aria-label': 'No rating' },
    components: buildTestimonialRatingMarkup(0),
  },
  {
    tagName: 'blockquote',
    name: 'Quote',
    classes: ['db-testimonial-quote'],
    components: [
      {
        tagName: 'p',
        type: 'text',
        name: 'Quote text',
        attributes: { 'data-db-field': 'quote' },
        components: presetRecord.quote,
      },
    ],
  },
  {
    tagName: 'figcaption',
    name: 'Who said it',
    classes: ['db-testimonial-caption'],
    components: [
      {
        type: 'db-image',
        classes: ['db-image', 'db-testimonial-avatar'],
        attributes: {
          src: buildMarketingPlaceholderUri('avatar'),
          alt: 'Portrait of ' + presetRecord.name,
          loading: 'lazy',
          decoding: 'async',
          width: '96',
          height: '96',
          'data-db-field': 'portrait',
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
            attributes: { 'data-db-field': 'name' },
            components: presetRecord.name,
          },
          {
            tagName: 'span',
            type: 'text',
            name: 'Role',
            classes: ['db-testimonial-role'],
            attributes: { 'data-db-field': 'role' },
            components: presetRecord.role,
          },
          {
            tagName: 'span',
            name: 'Review source',
            classes: ['db-testimonial-source'],
            attributes: { 'data-db-testimonial-source': 'true' },
            components: '',
          },
        ],
      },
    ],
  },
];

export default buildTestimonialDefaultChildren;
