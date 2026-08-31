import escapeHtmlText from '../support/escapeHtmlText.js';

const buildCheckboxTypeDefinition = (formTextDefaults) => ({
  type: 'db-checkbox',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'checkbox') && { type: 'db-checkbox' },
  model: {
    defaults: {
      tagName: 'label',
      name: 'Checkbox',
      draggable: '[data-db-type=form], [data-db-type=form-field]',
      droppable: false,
      classes: ['db-choice', 'db-checkbox'],
      attributes: {
        'data-db-type': 'checkbox',
        'data-db-form-child': 'true',
        'data-db-form-control': 'true',
        'data-db-label': formTextDefaults.checkboxLabelText,
        'data-db-name': 'subscribe',
        'data-db-value': 'yes',
        'data-db-required': 'false',
      },
      components: [
        { tagName: 'input', attributes: { type: 'checkbox', name: 'subscribe', value: 'yes' } },
        {
          tagName: 'span',
          classes: ['db-choice-text'],
          attributes: { 'data-db-choice-text': 'true' },
          components: escapeHtmlText(formTextDefaults.checkboxLabelText),
        },
      ],
      traits: [
        { type: 'text', name: 'data-db-label', label: 'Label text' },
        { type: 'text', name: 'data-db-name', label: 'Field name' },
        { type: 'text', name: 'data-db-value', label: 'Submitted value' },
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

export default buildCheckboxTypeDefinition;
