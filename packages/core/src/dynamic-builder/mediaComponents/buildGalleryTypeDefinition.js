import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import getGalleryTraitDefinitions from './getGalleryTraitDefinitions.js';
import runGalleryLightboxBehavior from './runGalleryLightboxBehavior.js';

const buildGalleryTypeDefinition = () => ({
  type: 'db-gallery',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'gallery') && { type: 'db-gallery' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Gallery',
      draggable: getDropTargetSelectors().anyLayout,
      droppable: '[data-db-type=gallery-item]',
      classes: ['db-gallery'],
      attributes: {
        'data-db-type': 'gallery',
        'data-db-columns': '3',
        'data-db-mobile-columns': '2',
        'data-db-aspect': 'landscape',
        'data-db-gap': 'md',
        'data-db-captions': 'true',
        'data-db-lightbox': 'true',
      },
      components: [{ type: 'db-gallery-item' }, { type: 'db-gallery-item' }, { type: 'db-gallery-item' }],
      script: runGalleryLightboxBehavior,
      traits: getGalleryTraitDefinitions(),
    },
  },
});

export default buildGalleryTypeDefinition;
