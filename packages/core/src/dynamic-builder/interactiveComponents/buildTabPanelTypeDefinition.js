import escapeHtmlText from '../support/escapeHtmlText.js';

const buildTabPanelTypeDefinition = (interactiveTextDefaults) => ({
  type: 'db-tab-panel',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'tab-panel') && { type: 'db-tab-panel' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Tab panel',
      draggable: '[data-db-type=tabs]',
      droppable: true,
      classes: ['db-tab-panel'],
      attributes: { 'data-db-type': 'tab-panel', role: 'tabpanel', tabindex: '0', hidden: 'hidden' },
      components: `<p>${escapeHtmlText(interactiveTextDefaults.tabPanelText)}</p>`,
    },
  },
});

export default buildTabPanelTypeDefinition;
