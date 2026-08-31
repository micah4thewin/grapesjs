import buildRepeaterDefaultChildren from './buildRepeaterDefaultChildren.js';
import buildRepeaterTraitDefinitions from './buildRepeaterTraitDefinitions.js';
import listDataSourceNames from './listDataSourceNames.js';

const buildRepeaterTypeDefinition = () => ({
  type: 'db-repeater',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'repeater') && { type: 'db-repeater' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Repeater',
      draggable: true,
      droppable: '[data-db-type=repeater-item]',
      classes: ['db-repeater'],
      attributes: {
        'data-db-type': 'repeater',
        'data-db-repeater': 'true',
        'data-db-source': 'products',
        'data-db-limit': '0',
        'data-db-offset': '0',
      },
      components: buildRepeaterDefaultChildren(),
      traits: (repeaterComponent) =>
        buildRepeaterTraitDefinitions(listDataSourceNames(repeaterComponent && repeaterComponent.em)),
    },
  },
});

export default buildRepeaterTypeDefinition;
