const buildTabListTypeDefinition = () => ({
  type: 'db-tab-list',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'tab-list') && { type: 'db-tab-list' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Tab list',
      draggable: '[data-db-type=tabs]',
      droppable: '[data-db-type=tab-button]',
      copyable: false,
      removable: false,
      classes: ['db-tab-list'],
      attributes: { 'data-db-type': 'tab-list', role: 'tablist' },
    },
  },
});

export default buildTabListTypeDefinition;
