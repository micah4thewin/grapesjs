import buildTestimonialDefaultChildren from './buildTestimonialDefaultChildren.js';

const buildTestimonialTypeDefinition = () => ({
  type: 'db-testimonial',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'testimonial') && { type: 'db-testimonial' },
  model: {
    defaults: {
      tagName: 'figure',
      name: 'Testimonial',
      draggable: true,
      droppable: false,
      classes: ['db-testimonial'],
      attributes: { 'data-db-type': 'testimonial' },
      components: buildTestimonialDefaultChildren(),
    },
  },
});

export default buildTestimonialTypeDefinition;
