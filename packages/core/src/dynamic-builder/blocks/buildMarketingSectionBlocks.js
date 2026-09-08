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
  buildBlockDefinition('db-footer-simple', 'Simple footer', 'Marketing', 'footer', {
    type: 'db-footer',
    attributes: { 'data-db-footer': 'simple', 'data-db-theme': 'default' },
  }),
  buildBlockDefinition('db-footer-centered', 'Centered footer', 'Marketing', 'footer', {
    type: 'db-footer',
    attributes: { 'data-db-footer': 'centered', 'data-db-theme': 'light' },
  }),
  buildBlockDefinition('db-footer-newsletter', 'Footer with signup', 'Marketing', 'footer', {
    type: 'db-footer',
    attributes: { 'data-db-footer': 'newsletter' },
  }),
  buildBlockDefinition('db-cta-banner', 'Call to action', 'Marketing', 'button', buildCtaBannerContent()),
];

export default buildMarketingSectionBlocks;
