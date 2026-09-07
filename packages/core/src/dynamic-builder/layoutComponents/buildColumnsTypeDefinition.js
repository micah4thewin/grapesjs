import getDropTargetSelectors from '../support/getDropTargetSelectors.js';
import buildSpacingSelectOptions from './buildSpacingSelectOptions.js';
import getColumnPresetRecord from './getColumnPresetRecord.js';
import getLayoutSpacingScale from './getLayoutSpacingScale.js';

const buildColumnsTypeDefinition = () => {
  const presetRecord = getColumnPresetRecord();
  const presetOptions = Object.keys(presetRecord).map((presetKey) => ({
    id: presetKey,
    label: presetRecord[presetKey].label,
  }));
  const defaultColumnChildren = Array.from({ length: presetRecord.two.columnCount }, () => ({ type: 'db-column' }));
  return {
    type: 'db-columns',
    isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'columns') && { type: 'db-columns' },
    model: {
      defaults: {
        tagName: 'div',
        name: 'Columns',
        draggable: getDropTargetSelectors().sectionBody,
        droppable: '[data-db-type=column]',
        classes: ['db-columns'],
        attributes: {
          'data-db-type': 'columns',
          'data-db-columns': 'two',
          'data-db-gap': 'md',
          'data-db-valign': 'top',
          'data-db-mobile': 'stack',
        },
        components: defaultColumnChildren,
        traits: [
          { type: 'select', name: 'data-db-columns', label: 'Layout', default: 'two', options: presetOptions },
          {
            type: 'select',
            name: 'data-db-gap',
            label: 'Space between columns',
            default: 'md',
            options: buildSpacingSelectOptions(getLayoutSpacingScale().gapSizes),
          },
          {
            type: 'select',
            name: 'data-db-valign',
            label: 'Vertical alignment',
            default: 'top',
            options: [
              { id: 'top', label: 'Top' },
              { id: 'middle', label: 'Middle' },
              { id: 'bottom', label: 'Bottom' },
            ],
          },
          {
            type: 'select',
            name: 'data-db-mobile',
            label: 'On phones',
            default: 'stack',
            options: [
              { id: 'stack', label: 'Stack the columns' },
              { id: 'stack-reverse', label: 'Stack, last column first' },
              { id: 'side-by-side', label: 'Keep side by side' },
            ],
          },
        ],
      },
    },
  };
};

export default buildColumnsTypeDefinition;
