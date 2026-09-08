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
      attributes: { 'data-db-type': 'footer', 'data-db-theme': 'dark', 'data-db-footer': 'columns' },
      components: buildFooterDefaultChildren(),
      traits: [
        {
          type: 'select',
          name: 'data-db-footer',
          label: 'Layout',
          default: 'columns',
          options: [
            { id: 'columns', label: 'Brand and link columns' },
            { id: 'simple', label: 'One row' },
            { id: 'centered', label: 'Centered' },
            { id: 'newsletter', label: 'Columns with email signup' },
          ],
        },
        ...buildMarketingSectionTraits('dark', 'footer'),
      ],
    },
  },
});

export default buildFooterTypeDefinition;
