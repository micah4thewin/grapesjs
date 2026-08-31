import getIconMarkup from '../support/getIconMarkup.js';
import buildMarketingPlaceholderUri from './buildMarketingPlaceholderUri.js';

const buildCardDefaultChildren = () => [
  {
    type: 'db-image',
    classes: ['db-image', 'db-card-image'],
    attributes: {
      src: buildMarketingPlaceholderUri('card'),
      alt: 'Article cover illustration',
      loading: 'lazy',
      decoding: 'async',
      width: '640',
      height: '400',
    },
  },
  {
    tagName: 'div',
    name: 'Card body',
    classes: ['db-card-body'],
    components: [
      {
        tagName: 'h3',
        type: 'text',
        name: 'Card title',
        classes: ['db-card-title'],
        components: 'A headline that earns the click',
      },
      {
        tagName: 'p',
        type: 'text',
        name: 'Card text',
        classes: ['db-card-text'],
        components: 'Summarize the value of the destination in one or two sentences so readers know what to expect.',
      },
      {
        tagName: 'a',
        name: 'Card link',
        classes: ['db-card-link', 'db-stretched-link'],
        attributes: { href: '#' },
        components: '<span>Learn more</span>' + getIconMarkup('arrowRight', { size: 16 }),
        traits: [
          { type: 'db-url', name: 'href', label: 'Link URL' },
          { type: 'db-aria-label', name: 'aria-label', label: 'ARIA label' },
        ],
      },
    ],
  },
];

export default buildCardDefaultChildren;
