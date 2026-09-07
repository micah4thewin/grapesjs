import buildSelectOptionDefinitions from './buildSelectOptionDefinitions.js';

const buildSelectTypeDefinition = (formTextDefaults) => ({
  type: 'db-select',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'select') && { type: 'db-select' },
  model: {
    defaults: {
      tagName: 'select',
      name: 'Dropdown',
      draggable: '[data-db-type=form-field]',
      droppable: false,
      classes: ['db-field-control', 'db-select'],
      attributes: {
        'data-db-type': 'select',
        'data-db-form-control': 'true',
        name: 'topic',
        'data-db-options': formTextDefaults.selectOptionsText,
        'data-db-placeholder': formTextDefaults.selectPlaceholderText,
        'data-db-selected': '',
      },
      components: buildSelectOptionDefinitions(
        formTextDefaults.selectOptionsText,
        formTextDefaults.selectPlaceholderText,
        '',
      ),
      traits: [
        { type: 'db-option-list', name: 'data-db-options', label: 'Options' },
        {
          type: 'text',
          name: 'data-db-placeholder',
          label: 'First line before choosing',
          placeholder: 'Leave empty to preselect the first option',
        },
        { type: 'text', name: 'name', label: 'Field name', placeholder: 'topic' },
      ],
    },
  },
});

export default buildSelectTypeDefinition;
