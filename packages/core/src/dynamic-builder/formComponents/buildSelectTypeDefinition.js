import buildSelectOptionsMarkup from './buildSelectOptionsMarkup.js';

const buildSelectTypeDefinition = (formTextDefaults) => ({
  type: 'db-select',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'select') && { type: 'db-select' },
  model: {
    defaults: {
      tagName: 'select',
      name: 'Select',
      draggable: '[data-db-type=form-field]',
      droppable: false,
      classes: ['db-field-control', 'db-select'],
      attributes: {
        'data-db-type': 'select',
        'data-db-form-control': 'true',
        name: 'topic',
        'data-db-options': formTextDefaults.selectOptionsText,
      },
      components: buildSelectOptionsMarkup(formTextDefaults.selectOptionsText),
      traits: [
        { type: 'text', name: 'name', label: 'Field name' },
        {
          type: 'db-textarea-trait',
          name: 'data-db-options',
          label: 'Options',
          placeholder: 'value|Label, one per line',
        },
      ],
    },
  },
});

export default buildSelectTypeDefinition;
