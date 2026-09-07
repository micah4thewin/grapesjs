import buildTestimonialDefaultChildren from './buildTestimonialDefaultChildren.js';
import getTestimonialPresetRecords from './getTestimonialPresetRecords.js';

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
      attributes: { 'data-db-type': 'testimonial', 'data-db-rating': '0', 'data-db-source': '' },
      components: buildTestimonialDefaultChildren(getTestimonialPresetRecords()[0]),
      traits: [
        {
          type: 'select',
          name: 'data-db-rating',
          label: 'Star rating',
          default: '0',
          options: [
            { id: '0', label: 'No stars' },
            { id: '1', label: '1 star' },
            { id: '2', label: '2 stars' },
            { id: '3', label: '3 stars' },
            { id: '4', label: '4 stars' },
            { id: '5', label: '5 stars' },
          ],
        },
        { type: 'text', name: 'data-db-source', label: 'Where the review comes from', placeholder: 'via Google' },
      ],
    },
  },
});

export default buildTestimonialTypeDefinition;
