import buildFooterDefaultChildren from './buildFooterDefaultChildren.js';
import buildMarketingSectionTraits from './buildMarketingSectionTraits.js';

const buildFooterTypeDefinition = () => ({
  type: 'db-footer',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'footer') && { type: 'db-footer' },
  model: {
    defaults: {
      tagName: 'footer',
      name: 'Footer',
      draggable: '[data-gjs-type=wrapper]',
      droppable: false,
      classes: ['db-footer'],
      attributes: { 'data-db-type': 'footer', 'data-db-theme': 'dark' },
      components: buildFooterDefaultChildren(),
      traits: buildMarketingSectionTraits('dark', 'footer'),
    },
  },
});

export default buildFooterTypeDefinition;
