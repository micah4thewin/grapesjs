const buildGalleryItemTypeDefinition = () => ({
  type: 'db-gallery-item',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'gallery-item') && { type: 'db-gallery-item' },
  model: {
    defaults: {
      tagName: 'figure',
      name: 'Gallery item',
      draggable: '[data-db-type=gallery]',
      droppable: false,
      classes: ['db-gallery-item'],
      attributes: { 'data-db-type': 'gallery-item', 'data-db-show-caption': 'true' },
      components: [
        { type: 'db-image' },
        { tagName: 'figcaption', type: 'text', classes: ['db-gallery-caption'], components: 'A short image caption' },
      ],
      traits: [
        {
          type: 'checkbox',
          name: 'data-db-show-caption',
          label: 'Show caption',
          valueTrue: 'true',
          valueFalse: 'false',
          default: 'true',
        },
      ],
    },
  },
});

export default buildGalleryItemTypeDefinition;
