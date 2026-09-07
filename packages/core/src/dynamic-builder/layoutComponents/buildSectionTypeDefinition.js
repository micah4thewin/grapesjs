import buildDropRule from '../support/buildDropRule.js';
import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import getPageLevelComponentTypes from '../support/getPageLevelComponentTypes.js';
import buildSectionTraitDefinitions from './buildSectionTraitDefinitions.js';

const buildSectionTypeDefinition = () => ({
  type: 'db-section',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'section') && { type: 'db-section' },
  model: {
    defaults: {
      tagName: 'section',
      name: 'Section',
      draggable: getDropTargetSelectors().pageOnly,
      droppable: buildDropRule(getPageLevelComponentTypes()),
      classes: ['db-section'],
      attributes: { 'data-db-type': 'section', 'data-db-layout': 'contained', 'data-db-theme': 'default' },
      components: [{ type: 'db-container', name: 'Section content' }],
      traits: buildSectionTraitDefinitions(),
    },
  },
});

export default buildSectionTypeDefinition;
