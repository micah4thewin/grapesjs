import buildMarketingPlaceholderUri from './buildMarketingPlaceholderUri.js';

const buildLogoCloudDefaultChildren = () => {
  const logoNames = ['Acme Co', 'Northwind', 'Globex', 'Initech', 'Luminary', 'Vertex'];
  return logoNames.map((logoName) => ({
    tagName: 'li',
    name: logoName + ' logo item',
    classes: ['db-logo-cloud-item'],
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
  }));
};

export default buildLogoCloudDefaultChildren;
