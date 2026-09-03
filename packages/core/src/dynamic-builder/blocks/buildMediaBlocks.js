import buildBlockDefinition from './buildBlockDefinition.js';
import buildTextContentRecord from './buildTextContentRecord.js';

const buildMediaBlocks = () => [
  buildBlockDefinition('db-image', 'Image', 'Media', 'image', { type: 'db-image' }),
  buildBlockDefinition('db-figure', 'Figure', 'Media', 'article', {
    tagName: 'figure',
    name: 'Figure',
    classes: ['db-figure'],
    components: [
      { type: 'db-image' },
      {
        tagName: 'figcaption',
        type: 'text',
        name: 'Figure caption',
        classes: ['db-figure-caption'],
        components: 'Describe the image for readers and search engines.',
      },
    ],
  }),
  buildBlockDefinition('db-gallery', 'Gallery', 'Media', 'gallery', { type: 'db-gallery' }),
  buildBlockDefinition('db-carousel', 'Carousel', 'Media', 'carousel', { type: 'db-carousel' }),
  buildBlockDefinition('db-video', 'Video', 'Media', 'video', { type: 'db-video' }),
  buildBlockDefinition('db-map', 'Map', 'Media', 'map', { type: 'db-map' }),
  buildBlockDefinition('db-icon', 'Icon', 'Media', 'star', { type: 'db-icon' }),
  buildBlockDefinition('db-icon-text-row', 'Icon + text', 'Media', 'badge', {
    tagName: 'div',
    name: 'Icon text row',
    classes: ['db-icon-row'],
    components: [
      { type: 'db-icon' },
      buildTextContentRecord('Pair an icon with short supporting copy to highlight a benefit.'),
    ],
  }),
];

export default buildMediaBlocks;
