import buildInputTraitDefinitions from './buildInputTraitDefinitions.js';

const buildInputTypeDefinition = (formTextDefaults) => ({
  type: 'db-input',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'input') && { type: 'db-input' },
  model: {
    defaults: {
      tagName: 'input',
      name: 'Text box',
      draggable: '[data-db-type=form-field]',
      droppable: false,
      classes: ['db-field-control', 'db-input'],
      attributes: {
        'data-db-type': 'input',
        'data-db-form-control': 'true',
        type: 'text',
        name: 'field',
        placeholder: formTextDefaults.inputPlaceholderText,
      },
      traits: buildInputTraitDefinitions(),
    },
  },
});

export default buildInputTypeDefinition;
