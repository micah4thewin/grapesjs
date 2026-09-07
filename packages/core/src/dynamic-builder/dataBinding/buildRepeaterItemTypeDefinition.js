import buildRepeaterItemInnerMarkup from './buildRepeaterItemInnerMarkup.js';

const buildRepeaterItemTypeDefinition = () => ({
  type: 'db-repeater-item',
  isComponent: (el) =>
    Boolean(el && el.dataset && el.dataset.dbType === 'repeater-item') && { type: 'db-repeater-item' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Item template',
      draggable: '[data-db-type=repeater]',
      droppable: true,
      classes: ['db-repeater-item'],
      attributes: { 'data-db-type': 'repeater-item', 'data-db-repeater-item': 'true' },
      components: buildRepeaterItemInnerMarkup(),
    },
  },
});

export default buildRepeaterItemTypeDefinition;
