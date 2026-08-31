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
        draggable: '[data-db-type=section], [data-db-type=container], [data-db-type=column]',
        droppable: '[data-db-type=column]',
        classes: ['db-columns', 'db-stack-mobile'],
        attributes: {
          'data-db-type': 'columns',
          'data-db-columns': 'two',
          'data-db-gap': 'md',
          'data-db-stack-mobile': 'true',
          'data-db-reverse-mobile': 'false',
        },
        components: defaultColumnChildren,
        traits: [
          { type: 'select', name: 'data-db-columns', label: 'Column preset', default: 'two', options: presetOptions },
          {
            type: 'select',
            name: 'data-db-gap',
            label: 'Column gap',
            default: 'md',
            options: buildSpacingSelectOptions(getLayoutSpacingScale().gapSizes),
          },
          {
            type: 'checkbox',
            name: 'data-db-stack-mobile',
            label: 'Stack on mobile',
            valueTrue: 'true',
            valueFalse: 'false',
            default: 'true',
          },
          {
            type: 'checkbox',
            name: 'data-db-reverse-mobile',
            label: 'Reverse on mobile',
            valueTrue: 'true',
            valueFalse: 'false',
            default: 'false',
          },
        ],
      },
    },
  };
};

export default buildColumnsTypeDefinition;
