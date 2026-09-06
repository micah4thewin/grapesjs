import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
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
        'data-db-gap': 'md',
        'data-db-lightbox': 'true',
      },
      components: [{ type: 'db-gallery-item' }, { type: 'db-gallery-item' }, { type: 'db-gallery-item' }],
      script: runGalleryLightboxBehavior,
      traits: [
        {
          type: 'select',
          name: 'data-db-columns',
          label: 'Columns',
          default: '3',
          options: [
            { id: '2', label: 'Two' },
            { id: '3', label: 'Three' },
            { id: '4', label: 'Four' },
          ],
        },
        {
          type: 'select',
          name: 'data-db-gap',
          label: 'Gap',
          default: 'md',
          options: [
            { id: 'sm', label: 'Small' },
            { id: 'md', label: 'Medium' },
            { id: 'lg', label: 'Large' },
          ],
        },
        {
          type: 'checkbox',
          name: 'data-db-lightbox',
          label: 'Enable lightbox',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'true',
        },
      ],
    },
  },
});

export default buildGalleryTypeDefinition;
