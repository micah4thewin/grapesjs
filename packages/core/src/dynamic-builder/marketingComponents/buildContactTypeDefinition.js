import buildContactDefaultChildren from './buildContactDefaultChildren.js';

const buildContactTypeDefinition = () => ({
  type: 'db-contact',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'contact') && { type: 'db-contact' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Contact details',
      draggable: true,
      droppable: false,
      classes: ['db-contact'],
      attributes: { 'data-db-type': 'contact' },
      components: buildContactDefaultChildren(),
    },
  },
});

export default buildContactTypeDefinition;
