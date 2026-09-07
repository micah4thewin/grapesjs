import escapeHtmlText from '../support/escapeHtmlText.js';
import buildShowWhenTraitDefinitions from './buildShowWhenTraitDefinitions.js';
import getFormChildDropTargets from './getFormChildDropTargets.js';

const buildCheckboxTypeDefinition = (formTextDefaults) => ({
  type: 'db-checkbox',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'checkbox') && { type: 'db-checkbox' },
  model: {
    defaults: {
      tagName: 'label',
      name: 'Checkbox',
      draggable: getFormChildDropTargets(),
      droppable: false,
      classes: ['db-choice', 'db-checkbox'],
      attributes: {
        'data-db-type': 'checkbox',
        'data-db-form-child': 'true',
        'data-db-label': formTextDefaults.checkboxLabelText,
        'data-db-name': 'subscribe',
        'data-db-value': 'yes',
        'data-db-required': 'false',
      },
      components: [
        {
          tagName: 'input',
          attributes: { type: 'checkbox', name: 'subscribe', value: 'yes' },
          selectable: false,
          hoverable: false,
          layerable: false,
          draggable: false,
          removable: false,
          copyable: false,
          traits: [],
        },
        {
          type: 'db-field-label',
          tagName: 'span',
          classes: ['db-choice-text'],
          attributes: { 'data-db-choice-text': 'true' },
          components: escapeHtmlText(formTextDefaults.checkboxLabelText),
        },
      ],
      traits: [
        { type: 'text', name: 'data-db-label', label: 'Label text' },
        {
          type: 'checkbox',
          name: 'data-db-required',
          label: 'Must be ticked',
          valueTrue: 'true',
          valueFalse: 'false',
        },
        { type: 'text', name: 'data-db-name', label: 'Field name', placeholder: 'subscribe' },
        { type: 'text', name: 'data-db-value', label: 'Value sent when ticked', placeholder: 'yes' },
        ...buildShowWhenTraitDefinitions(),
      ],
    },
  },
});

export default buildCheckboxTypeDefinition;
