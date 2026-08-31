import buildBlockDefinition from './buildBlockDefinition.js';
import buildCtaBannerContent from './buildCtaBannerContent.js';

const buildMarketingSectionBlocks = () => [
  buildBlockDefinition('db-hero-centered', 'Hero: centered', 'Marketing', 'hero', {
    type: 'db-hero',
    attributes: { 'data-db-hero': 'centered' },
  }),
  buildBlockDefinition('db-hero-split', 'Hero: split', 'Marketing', 'hero', { type: 'db-hero' }),
  buildBlockDefinition('db-features-three-up', 'Features three-up', 'Marketing', 'features', { type: 'db-features' }),
  buildBlockDefinition('db-contact', 'Contact section', 'Marketing', 'contact', { type: 'db-contact' }),
  buildBlockDefinition('db-footer', 'Footer', 'Marketing', 'footer', { type: 'db-footer' }),
  buildBlockDefinition('db-cta-banner', 'CTA banner', 'Marketing', 'button', buildCtaBannerContent()),
];

export default buildMarketingSectionBlocks;
