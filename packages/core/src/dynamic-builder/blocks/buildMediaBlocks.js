import buildBlockDefinition from './buildBlockDefinition.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';

const buildMediaBlocks = () => [
  buildBlockDefinition('db-image', 'Image', 'Media', 'image', { type: 'db-image' }),
  buildBlockDefinition('db-figure', 'Picture with caption', 'Media', 'article', { type: 'db-figure' }),
  buildBlockDefinition(
    'db-gallery',
    'Gallery',
    'Media',
    'gallery',
    buildSectionContentRecord([{ type: 'db-gallery' }]),
  ),
  buildBlockDefinition(
    'db-carousel',
    'Carousel',
    'Media',
    'carousel',
    buildSectionContentRecord([{ type: 'db-carousel' }]),
  ),
  buildBlockDefinition('db-video', 'Video', 'Media', 'video', { type: 'db-video' }),
  buildBlockDefinition('db-map', 'Map', 'Media', 'map', { type: 'db-map' }),
  buildBlockDefinition('db-icon', 'Icon', 'Media', 'star', { type: 'db-icon' }),
  buildBlockDefinition('db-icon-text-row', 'Icon with text', 'Media', 'badge', { type: 'db-icon-row' }),
];

export default buildMediaBlocks;
