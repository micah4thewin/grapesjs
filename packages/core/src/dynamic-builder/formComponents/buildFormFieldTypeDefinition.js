import buildFormFieldChildren from './buildFormFieldChildren.js';
import runFormFieldBehavior from './runFormFieldBehavior.js';

const buildFormFieldTypeDefinition = (formTextDefaults) => ({
  type: 'db-form-field',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'form-field') && { type: 'db-form-field' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Form field',
      draggable: '[data-db-type=form]',
      droppable: '[data-db-form-control]',
      classes: ['db-form-field'],
      attributes: {
        'data-db-type': 'form-field',
        'data-db-form-child': 'true',
        'data-db-form-field': 'true',
        'data-db-label': formTextDefaults.fieldLabelText,
        'data-db-required': 'false',
      },
      components: buildFormFieldChildren(
        formTextDefaults.fieldLabelText,
        {
          type: 'db-input',
          attributes: {
            'data-db-type': 'input',
            'data-db-form-control': 'true',
            type: 'text',
            name: 'field',
            placeholder: formTextDefaults.inputPlaceholderText,
          },
        },
        '',
        false,
      ),
      script: runFormFieldBehavior,
      traits: [
        { type: 'text', name: 'data-db-label', label: 'Label text' },
        { type: 'text', name: 'data-db-help', label: 'Help text' },
        {
          type: 'checkbox',
          name: 'data-db-required',
          label: 'Required',
          valueTrue: 'true',
          valueFalse: 'false',
        },
      ],
    },
  },
});

export default buildFormFieldTypeDefinition;
