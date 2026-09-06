import buildDropRule from '../support/buildDropRule.js';
import getPageLevelComponentTypes from '../support/getPageLevelComponentTypes.js';
import buildLayoutPlaceholderChildren from './buildLayoutPlaceholderChildren.js';

const buildColumnTypeDefinition = () => ({
  type: 'db-column',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'column') && { type: 'db-column' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Column',
      draggable: '[data-db-type=columns]',
      droppable: buildDropRule(getPageLevelComponentTypes()),
      classes: ['db-column'],
      attributes: { 'data-db-type': 'column' },
      components: buildLayoutPlaceholderChildren('column'),
    },
  },
});

export default buildColumnTypeDefinition;
