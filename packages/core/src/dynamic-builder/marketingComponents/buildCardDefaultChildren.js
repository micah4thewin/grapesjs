import buildMarketingPlaceholderUri from './buildMarketingPlaceholderUri.js';

const buildCardDefaultChildren = () => {
  const titleText = 'A headline that earns the click';
  return [
    {
      type: 'db-image',
      classes: ['db-image', 'db-card-image'],
      attributes: {
        src: buildMarketingPlaceholderUri('card'),
        alt: 'Cover picture',
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
          attributes: { 'data-db-field': 'title' },
          components: titleText,
        },
        {
          tagName: 'p',
          type: 'text',
          name: 'Card text',
          classes: ['db-card-text'],
          components: 'Summarize the value of the destination in one or two sentences so readers know what to expect.',
        },
        {
          type: 'db-button',
          name: 'Card link',
          classes: ['db-button', 'db-button-link', 'db-button-md', 'db-card-link', 'db-stretched-link'],
          attributes: {
            'data-db-variant': 'link',
            'data-db-size': 'md',
            href: '#',
            'aria-label': 'Read more: ' + titleText,
            'data-db-field': 'link',
          },
          components: 'Read more',
        },
      ],
    },
  ];
};

export default buildCardDefaultChildren;
