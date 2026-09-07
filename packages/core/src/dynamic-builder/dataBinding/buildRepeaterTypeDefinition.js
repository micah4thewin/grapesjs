import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import buildRepeaterDefaultChildren from './buildRepeaterDefaultChildren.js';
import buildRepeaterTraitDefinitions from './buildRepeaterTraitDefinitions.js';
import listDataSourceNames from './listDataSourceNames.js';
import resolveEditorFromComponent from './resolveEditorFromComponent.js';
import scheduleRepeaterPreviewRender from './scheduleRepeaterPreviewRender.js';

const buildRepeaterTypeDefinition = () => ({
  type: 'db-repeater',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'repeater') && { type: 'db-repeater' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Repeater',
      draggable: getDropTargetSelectors().anyLayout,
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
        buildRepeaterTraitDefinitions(
          listDataSourceNames(resolveEditorFromComponent(repeaterComponent)),
          repeaterComponent && repeaterComponent.getAttributes
            ? repeaterComponent.getAttributes()['data-db-source']
            : '',
        ),
    },
  },
  view: {
    onRender: ({ editor, model }) => {
      if (editor && model) scheduleRepeaterPreviewRender(editor, model);
    },
  },
});

export default buildRepeaterTypeDefinition;
