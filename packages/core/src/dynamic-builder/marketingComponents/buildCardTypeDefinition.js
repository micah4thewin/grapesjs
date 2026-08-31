import buildCardDefaultChildren from './buildCardDefaultChildren.js';

const buildCardTypeDefinition = () => ({
  type: 'db-card',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'card') && { type: 'db-card' },
  model: {
    defaults: {
      tagName: 'article',
      name: 'Card',
      draggable: true,
      droppable: false,
      classes: ['db-card'],
      attributes: { 'data-db-type': 'card', 'data-db-variant': 'default' },
      components: buildCardDefaultChildren(),
      traits: [
        {
          type: 'select',
          name: 'data-db-variant',
          label: 'Variant',
          default: 'default',
          options: [
            { id: 'default', label: 'Default' },
            { id: 'horizontal', label: 'Horizontal' },
            { id: 'featured', label: 'Featured' },
          ],
        },
      ],
    },
  },
});

export default buildCardTypeDefinition;
