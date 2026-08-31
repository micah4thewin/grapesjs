import escapeHtmlText from '../support/escapeHtmlText.js';

const buildTabButtonTypeDefinition = (interactiveTextDefaults) => ({
  type: 'db-tab-button',
  extend: 'text',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'tab-button') && { type: 'db-tab-button' },
  model: {
    defaults: {
      tagName: 'button',
      name: 'Tab button',
      draggable: '[data-db-type=tab-list]',
      droppable: false,
      classes: ['db-tab-button'],
      attributes: {
        'data-db-type': 'tab-button',
        type: 'button',
        role: 'tab',
        'aria-selected': 'false',
        tabindex: '-1',
      },
      components: escapeHtmlText(interactiveTextDefaults.tabLabel),
    },
  },
});

export default buildTabButtonTypeDefinition;
