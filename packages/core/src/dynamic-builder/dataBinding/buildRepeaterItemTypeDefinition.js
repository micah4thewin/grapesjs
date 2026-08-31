const buildRepeaterItemTypeDefinition = () => ({
  type: 'db-repeater-item',
  isComponent: (el) =>
    Boolean(el && el.dataset && el.dataset.dbType === 'repeater-item') && { type: 'db-repeater-item' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Repeater Item',
      draggable: '[data-db-type=repeater]',
      droppable: true,
      classes: ['db-repeater-item'],
      attributes: { 'data-db-type': 'repeater-item', 'data-db-repeater-item': 'true' },
      components: [
        '<h4 class="db-repeater-item-heading">{{db:item.name}}</h4>',
        '<p class="db-repeater-item-body">{{db:item.description}}</p>',
      ].join(''),
    },
  },
});

export default buildRepeaterItemTypeDefinition;
