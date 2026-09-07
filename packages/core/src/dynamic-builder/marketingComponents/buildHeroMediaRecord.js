import buildMarketingPlaceholderUri from './buildMarketingPlaceholderUri.js';

const buildHeroMediaRecord = () => ({
  tagName: 'figure',
  name: 'Hero picture',
  classes: ['db-hero-media'],
  attributes: { 'data-db-hero-media': 'true' },
  components: [
    {
      type: 'db-image',
      classes: ['db-image', 'db-hero-image'],
      attributes: {
        src: buildMarketingPlaceholderUri('hero'),
        alt: 'A picture that shows what you offer',
        loading: 'eager',
        decoding: 'async',
        fetchpriority: 'high',
        width: '640',
        height: '400',
      },
    },
  ],
});

export default buildHeroMediaRecord;
