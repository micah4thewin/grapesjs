import buildBlockDefinition from './buildBlockDefinition.js';
import buildCtaBannerContent from './buildCtaBannerContent.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';

const buildMarketingSectionBlocks = () => [
  buildBlockDefinition('db-hero-centered', 'Centered hero', 'Marketing', 'hero', {
    type: 'db-hero',
    attributes: { 'data-db-hero': 'centered' },
  }),
  buildBlockDefinition('db-hero-split', 'Split hero', 'Marketing', 'hero', { type: 'db-hero' }),
  buildBlockDefinition(
    'db-features-three-up',
    'Features',
    'Marketing',
    'features',
    buildSectionContentRecord([{ type: 'db-features' }]),
  ),
  buildBlockDefinition(
    'db-contact',
    'Contact details',
    'Marketing',
    'contact',
    buildSectionContentRecord([{ type: 'db-contact' }]),
  ),
  buildBlockDefinition('db-footer', 'Footer', 'Marketing', 'footer', { type: 'db-footer' }),
  buildBlockDefinition('db-cta-banner', 'Call to action', 'Marketing', 'button', buildCtaBannerContent()),
];

export default buildMarketingSectionBlocks;
