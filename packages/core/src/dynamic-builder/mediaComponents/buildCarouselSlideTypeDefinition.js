const buildCarouselSlideTypeDefinition = () => ({
  type: 'db-carousel-slide',
  isComponent: (el) =>
    Boolean(el && el.dataset && el.dataset.dbType === 'carousel-slide') && { type: 'db-carousel-slide' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Carousel slide',
      draggable: '[data-db-carousel-track]',
      droppable: true,
      classes: ['db-carousel-slide'],
      attributes: {
        'data-db-type': 'carousel-slide',
        role: 'group',
        'aria-roledescription': 'slide',
        'aria-label': 'Media slide',
      },
      components: [{ type: 'db-image' }],
      traits: [{ type: 'db-aria-label', name: 'aria-label', label: 'Slide label' }],
    },
  },
});

export default buildCarouselSlideTypeDefinition;
