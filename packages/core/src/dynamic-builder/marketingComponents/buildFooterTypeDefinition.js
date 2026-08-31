import buildFooterDefaultChildren from './buildFooterDefaultChildren.js';

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
      attributes: { 'data-db-type': 'footer' },
      components: buildFooterDefaultChildren(),
    },
  },
});

export default buildFooterTypeDefinition;
