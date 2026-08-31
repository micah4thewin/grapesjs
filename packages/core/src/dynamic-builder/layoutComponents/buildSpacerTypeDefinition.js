import buildSpacingSelectOptions from './buildSpacingSelectOptions.js';
import getLayoutSpacingScale from './getLayoutSpacingScale.js';

const buildSpacerTypeDefinition = () => ({
  type: 'db-spacer',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'spacer') && { type: 'db-spacer' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Spacer',
      droppable: false,
      classes: ['db-spacer'],
      attributes: { 'data-db-type': 'spacer', 'data-db-spacer': 'md', 'aria-hidden': 'true' },
      traits: [
        {
          type: 'select',
          name: 'data-db-spacer',
          label: 'Height',
          default: 'md',
          options: buildSpacingSelectOptions(getLayoutSpacingScale().spacerSizes),
        },
      ],
    },
  },
});

export default buildSpacerTypeDefinition;
