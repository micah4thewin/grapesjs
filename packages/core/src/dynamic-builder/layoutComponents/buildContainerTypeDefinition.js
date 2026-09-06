import buildDropRule from '../support/buildDropRule.js';
import getPageLevelComponentTypes from '../support/getPageLevelComponentTypes.js';
import buildLayoutPlaceholderChildren from './buildLayoutPlaceholderChildren.js';

const buildContainerTypeDefinition = () => ({
  type: 'db-container',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'container') && { type: 'db-container' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Container',
      draggable: '[data-gjs-type=wrapper], [data-db-type=section]',
      droppable: buildDropRule(getPageLevelComponentTypes()),
      classes: ['db-container'],
      attributes: { 'data-db-type': 'container' },
      components: buildLayoutPlaceholderChildren('container'),
    },
  },
});

export default buildContainerTypeDefinition;
