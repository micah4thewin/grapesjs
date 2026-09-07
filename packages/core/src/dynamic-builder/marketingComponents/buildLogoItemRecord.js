import buildMarketingPlaceholderUri from './buildMarketingPlaceholderUri.js';

const buildLogoItemRecord = (logoName) => ({
  tagName: 'li',
  name: logoName + ' logo',
  classes: ['db-logo-cloud-item'],
  components: [
    {
      tagName: 'a',
      name: 'Logo link',
      classes: ['db-logo-cloud-link'],
      droppable: false,
      attributes: { 'data-db-logo-link': 'true', rel: 'noopener' },
      traits: [
        { type: 'db-url', name: 'href', label: 'Link URL (optional)', placeholder: 'https://partner.com' },
        { type: 'checkbox', name: 'target', label: 'Open in new tab', valueTrue: '_blank' },
      ],
      components: [
        {
          type: 'db-image',
          classes: ['db-image', 'db-logo-cloud-image'],
          attributes: {
            src: buildMarketingPlaceholderUri('logo', logoName),
            alt: logoName + ' logo',
            loading: 'lazy',
            decoding: 'async',
            width: '240',
            height: '80',
          },
        },
      ],
    },
  ],
});

export default buildLogoItemRecord;
